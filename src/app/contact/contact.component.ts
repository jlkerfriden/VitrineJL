import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from "../_services";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Globals, User } from "../_models";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	userEmail = "";
	userName = "";
	userMessage = "";
	contact: FormGroup;
	successfullySent = false;


	constructor(private alertService: AlertService,
				private userService: UserService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.contact = new FormGroup({
			'contactEmail': new FormControl(this.userEmail, [
				Validators.required,
				Validators.minLength(5),
				Validators.email
			]),
			'contactName': new FormControl(this.userName, [
				Validators.required
			]),
			'contactMessage': new FormControl(this.userMessage, [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(1024)
			])
		});
	}

	
	get contactEmail() { return this.contact.get('contactEmail'); }
	get contactName() { return this.contact.get('contactName'); }
	get contactMessage() { return this.contact.get('contactMessage'); }
	
	
	// Public
	
	onSubmit() {
		console.log("onSubmit");
		this.sendContactForm(this.contactEmail.value, this.contactName.value, this.contactMessage.value);
	}
	
	
	
	// Private

	private sendContactForm(email: string, name: string, message: string) {
		this.userService.sendContactForm(email, name, message).pipe(
		first()).subscribe(
			(result: any) => {
				if(!result) {
					this.alertService.error('Contact form error. Please try again later.');
				}
				else {
					if(result.error) {
						this.alertService.error(result.message, true);
					}
					else {
						this.alertService.success('Your message has been successfully sent, thank you !', true);
						this.successfullySent = true;
						console.log(result);
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
