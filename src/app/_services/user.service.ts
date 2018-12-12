import { Injectable } from '@angular/core';
import { User, Globals, Order } from "../_models";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private usersUrl = Globals.serverAddress+"/api/users";
	private userUrl = Globals.serverAddress+"/api/user";
	private userAuthUrl = Globals.serverAddress+"/api/user/auth";
	private contactUrl = Globals.serverAddress+"/api/contact";
	private userOrdersUrl = Globals.serverAddress+"/api/user/orders";
	private userAvatarUrl = Globals.serverAddress+"/api/user/avatar";
	private userDisplayNameUrl = Globals.serverAddress+"/api/user/displayName";
	
	constructor(private http: HttpClient) { }
	
	// Private
	
	private handleError<T> (operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
	
	private log(_msg: string) {
		if(Globals.log)
			console.log(_msg);
	}
	
	// Public
	
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.usersUrl).pipe(
			tap(users => this.log("fetched users")),
			catchError(this.handleError("geUsers", []))
		);
	}
	
	addUser(user: User): Observable<User> {
		return this.http.post(this.userUrl, user, httpOptions).pipe(
			tap((user: User) => this.log(`add new user with id=${user._id}`)),
			catchError(this.handleError<any>(`addUser`))
		);
	}
	
	/*loginUser(user: User): Observable<User> {
		return this.http.post(this.userAuthUrl, user, httpOptions).pipe(
			tap((user: User) => console.log(`get user with id=${user.id}`)),
			catchError(this.handleError<any>(`loginUser`))
		);
	}*/
	
	loginUser(user: User): Observable<User> {
        return this.http.post<any>(this.userAuthUrl, user, httpOptions).pipe(tap(user => {
                // login successful if there's a jwt token in the response
                if (user) {
					if(!user.error) {
						this.log(`get user with token=${user.token}`);
						sessionStorage.setItem('currentUser', JSON.stringify(user));
					}
                }

                return true;
            }),
			catchError(this.handleError<any>(`loginUser`))
		);
    }
	
	
	sendContactForm(email: string, name: string, message: string) {
        return this.http.post<any>(this.contactUrl, {email, name, message}, httpOptions).pipe(tap(result => {
                if (result) {
					if(!result.error) {
						this.log(`contact email sucessfully sent (server)`);
					}
                }

                return result;
            }),
			catchError(this.handleError<any>(`sendContactForm`))
		);
	}
	
	
	
	// Account 
	
	getUserOrders(limiteDate): Observable<Order[]> {
		console.log(+Date.now());
		console.log(limiteDate);
		var userInfos = JSON.parse(sessionStorage.getItem("currentUser"));
		console.log(userInfos.token);
		let params = new HttpParams().set("user_token", userInfos.token).set("limit_date", limiteDate);
		return this.http.get<Order[]>(this.userOrdersUrl, {headers: httpOptions.headers, params: params}).pipe(
			tap(orders => this.log("fetched user orders")),
			catchError(this.handleError("getUserOrders", []))
		);
	}
	
	uploadAvatar(avatar: File, user: User) {
		var params = new HttpParams().set("user_id", user._id);
		const uploadData = new FormData();
		uploadData.append('avatar', avatar, avatar.name);
		return this.http.post<any>(this.userAvatarUrl, uploadData, {params}).pipe(tap(result => {
                if (result) {
					if(!result.error) {
						this.log(`new avatar sucessfully sent (server)`);
					}
                }
                return result;
            }),
			catchError(this.handleError<any>(`uploadAvatar`))
		);
	}
	
	updateDisplayName(user: User) {
        return this.http.post<any>(this.userDisplayNameUrl, user, httpOptions).pipe(tap(result => {
                if (result) {
					if(result.error) {
						this.handleError<any>(`updateDisplayName`, result.message)
					}
					else {
						sessionStorage.setItem('currentUser', JSON.stringify(user));
					}
                }

                return result;
            }),
			catchError(this.handleError<any>(`updateDisplayName`))
		);
    }
}
