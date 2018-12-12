import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from "../../_services";
import { User, Globals, Order, OrderProduct, OrderStatus, OrderStatusVerbose } from "../../_models";
import { Validators, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	user: User;
	orders: Order[];
	orderStatus = OrderStatus;
	orderStatusVerbose = OrderStatusVerbose;
	private loading: boolean;
	selectedAvatar: File;
	imageSrc: string;
	changeName: FormGroup;
	orderHistoryLimitDateDays = 30;

	constructor(private userService: UserService,
				private alertService: AlertService) { }

	ngOnInit() {
		// Load user
		this.loading = true;
		this.user = JSON.parse(sessionStorage.getItem('currentUser')) as User;
		this.imageSrc = this.serverAddress + "/users/avatars/" + this.user._id + ".jpg";
		
		// Load recent orders
		/*this.userService.getUserOrders(this.user, this.orderHistoryLimitDate).subscribe(
			result => { 
				if(result) {
					this.orders = result;
					this.orders = this.orders.sort((a,b) => {
						return b.time - a.time;
					});
				}
				this.loading = false;
			},
			error => {
				console.log(error);
				this.loading = false;
			}
		);*/
		
		// Setup form
		this.changeName = new FormGroup({
			'displayName': new FormControl(this.user.displayName, [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(24)
			])
		});
		this.loading = false;
	}
	
	get displayName() { return this.changeName.get('displayName'); }
	
	onFileChanged(event) {
		this.selectedAvatar = event.target.files[0];
	}
	
	onUpload() {
		this.userService.uploadAvatar(this.selectedAvatar, this.user).subscribe(
			result => { 
				if(result) {
					if(result.error) {
						this.alertService.error(result.message);
					}
					else {
						this.imageSrc = "";
						setTimeout(() => {
							this.imageSrc = this.serverAddress + "/users/avatars/" + this.user._id + ".jpg";
						}, 512);
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	
	onSubmit() {
		this.user.displayName = this.displayName.value;
		this.userService.updateDisplayName(this.user).subscribe(
			result => { 
				if(result) {
					if(result.error)
						this.alertService.error(result.message);
					else
						this.alertService.success("Your display has been updated.");
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}