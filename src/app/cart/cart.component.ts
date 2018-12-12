import { Component, OnInit } from '@angular/core';
import { CartProduct, Globals } from '../_models';
import { CartService, NavigationService, AlertService } from "../_services";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	grandTotal: number;
	chekoutRequestSent = false;
	processingCheckoutRequest = false;
	sessionStrage;
	
	constructor(private cartService: CartService,
				private alertService: AlertService,
				private navigationService: NavigationService) {	}

	ngOnInit() {
		this.sessionStrage = sessionStorage;
		this.calcGrandTotal();
		this.navigationService.setNotifCart(false);
	}
	
	incrQuantity(_cartProduct: CartProduct, _incr: number) {
		let newQuantity = Math.min(+_cartProduct.quantity + _incr, 20);
		this.cartService.editProductQuantity(_cartProduct.product._id, newQuantity).then(res => {
			this.calcGrandTotal();
		},
		err => {
			console.log(err);
		});
	}
	
	deleteProduct(_cartProduct: CartProduct) {
		this.cartService.editProductQuantity(_cartProduct.product._id, 0).then(res => {
			this.calcGrandTotal();
		},
		err => {
			console.log(err);
		});
	}
	
	calcGrandTotal() {
		this.grandTotal = 0;
		for(let product of this.cartService.getProducts())
			this.grandTotal += product.product.price * product.quantity;
	}
	
	sendCheckoutRequest() {
		this.processingCheckoutRequest = true;
		this.cartService.sendCheckoutRequest().subscribe(
			result => { 
				console.log(result);
				if(!result) {
					this.alertService.error("Error : can't send chekout request. Please try again later.");
				}
				else {
					this.alertService.success('Checkout request successfully sent', true);
					this.chekoutRequestSent = true;
				}
				this.processingCheckoutRequest = false;
			},
			error => {
				console.log(error);
				this.processingCheckoutRequest = false;
			}
		);
	}
}
