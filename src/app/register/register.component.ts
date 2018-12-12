import { Component, OnInit } from '@angular/core';
import { User, Globals } from "../_models";
import { AlertService, UserService } from "../_services";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
	
	userEmail = "";
	userPass1 = "";
	userPass2 = "";
	register: FormGroup;
	minPasswordChars = Globals.minPasswordChars;
	maxPasswordChars = Globals.maxPasswordChars;
	
	constructor(private alertService: AlertService,
				private userService: UserService,
				private router: Router) { }

	ngOnInit() {
		this.register = new FormGroup({
			'registerEmail': new FormControl(this.userEmail, [
				Validators.required,
				Validators.minLength(5),
				Validators.email
			]),
			'registerPassword1': new FormControl(this.userPass1, [
				Validators.required,
				Validators.minLength(Globals.minPasswordChars),
				Validators.maxLength(Globals.maxPasswordChars)
			]),
			'registerPassword2': new FormControl(this.userPass2, [
				Validators.required,
				Validators.minLength(Globals.minPasswordChars),
				Validators.maxLength(Globals.maxPasswordChars)
			])
		}, this.passwordMatchValidator);
	}
	
	get registerEmail() { return this.register.get('registerEmail'); }
	get registerPassword1() { return this.register.get('registerPassword1'); }
	get registerPassword2() { return this.register.get('registerPassword2'); }

	
	// Public
	
	onSubmit() {
		console.log("onSubmit");
		this.addUser(this.registerEmail.value, this.registerPassword1.value);
	}
	
	
	
	// Private
	
	private passwordMatchValidator(formGroup: FormGroup) {
		return formGroup.get('registerPassword1').value == formGroup.get('registerPassword2').value ? null : {"mismatch":true};
	}

	private addUser(email: string, password: string) {
		this.userService.addUser({email, password} as User).subscribe(
			result => { 
				//console.log(result);
				//let newUser:User = user as User;
				//console.log(newUser.constructor.name);
				//console.log(user.constructor.name);
				if(!result) {
					this.alertService.error('Registration error. Please try again later.');
				}
				else {
					this.alertService.success('Registration successful', true);
					this.router.navigate(["/sign-in"]);
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
