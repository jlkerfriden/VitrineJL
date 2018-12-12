import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { User, Globals } from "../_models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {
	private countriesUrl = Globals.serverAddress+"/api/admin/countries";
	//private countriesUrl = Globals.serverAddress+"/api/user/auth";

	constructor(private http: HttpClient) { }
	
	
	private handleError<T> (operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
	
	// Public
	
	addCountry(name: string): Observable<any> {
		var country = {name};
		return this.http.post(this.countriesUrl, country, httpOptions).pipe(
			tap((country: any) => console.log(`added new country`)),
			catchError(this.handleError<any>(`addCountry`))
		);
	}
}
