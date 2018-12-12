import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../_services";
import { User, Globals, Order, OrderProduct, OrderStatus, OrderStatusVerbose } from "../../_models";

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	user: User;
	orders: Order[];
	orderStatus = OrderStatus;
	orderStatusVerbose = OrderStatusVerbose;
	loading: boolean;
	@Input() limitDate = 0;

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.loading = true;
		this.user = JSON.parse(sessionStorage.getItem('currentUser')) as User;
	  	this.userService.getUserOrders(this.limitDate > 0 ? + new Date() - 86400000 * this.limitDate : 0).subscribe(
			result => { 
				if(result) {
					//console.log(result);
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
		);
	}
}