import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from "../_services";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Globals, User } from "../_models";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
	userEmail = "";
	userPass = "";
	login: FormGroup;
	previousUrl: string;

	constructor(private alertService: AlertService,
				private userService: UserService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.login = new FormGroup({
			'loginEmail': new FormControl(this.userEmail, [
				Validators.required,
				Validators.minLength(5),
				Validators.email
			]),
			'loginPassword': new FormControl(this.userPass, [
				Validators.required,
				Validators.minLength(Globals.minPasswordChars),
				Validators.maxLength(Globals.maxPasswordChars)
			])
		});
		this.previousUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
	
	get loginEmail() { return this.login.get('loginEmail'); }
	get loginPassword() { return this.login.get('loginPassword'); }

	
	// Public
	
	onSubmit() {
		console.log("onSubmit");
		this.loginUser(this.loginEmail.value, this.loginPassword.value);
	}
	
	
	
	// Private

	private loginUser(email: string, password: string) {
		this.userService.loginUser({email, password} as User).pipe(
		first()).subscribe(
			(result: any) => {
				if(!result) {
					this.alertService.error('Login error. Please try again later.');
				}
				else {
					if(result.error) {
						this.alertService.error(result.message, true);
					}
					else {
						this.alertService.success('You are now logged in.', true);
						console.log(result);
						this.router.navigate([this.previousUrl]);
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
