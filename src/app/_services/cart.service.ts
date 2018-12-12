import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Globals, CartProduct, Product, OrderProduct } from '../_models';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
	private checkoutRequestUrl = Globals.serverAddress+"/api/checkoutrequest";
	private cartProducts: CartProduct[] = [];

    constructor(private http: HttpClient) {
		if(localStorage.getItem("cartProducts"))
			this.cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
	}
	
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
	
	private deleteProduct(_productId: string) {
		this.cartProducts = this.cartProducts.filter(prod => prod.product._id !== _productId);
	}
	
	private findProduct(_productId) {
		return this.cartProducts.findIndex(prod => prod.product._id === _productId);
	}
	
	private updateLocalStorage() {
		localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
	}
	
	// Public

	
	editProductQuantity(_productId: string, _quantity: number): Promise<boolean> {
		let promise = new Promise<boolean>((resolve, reject) => {
			if(_quantity <= 0) {
				this.deleteProduct(_productId);
			}
			else {
				let prodIndex = this.findProduct(_productId);
				this.cartProducts[prodIndex].quantity = _quantity;
			}
			this.updateLocalStorage();
			resolve();
		});
		return promise;
	}
	
	addProduct(_product: Product, _quantity: number): Promise<boolean> {
		let promise = new Promise<boolean>((resolve, reject) => {
			let prodIndex = this.findProduct(_product._id);
			if(prodIndex > -1) {
				this.cartProducts[prodIndex].quantity += _quantity;
			}
			else {
				let newCartProduct = new CartProduct(_product, _quantity);
				this.cartProducts.push(newCartProduct);
			}
			this.updateLocalStorage();
			resolve();
		});
		return promise;
	}
	
	clear(): Promise<boolean> {
		let promise = new Promise<boolean>((resolve, reject) => {
			this.cartProducts = [];
			this.updateLocalStorage();
			resolve();
		});
		return promise;
	}
	
	getProducts(): CartProduct[] {
		return this.cartProducts;
	}
	
	
	sendCheckoutRequest() {
		const user_id = JSON.parse(sessionStorage.getItem('currentUser'))._id;
		var orderProducts: OrderProduct[] = [];
		for(let product of this.cartProducts)
			orderProducts.push(new OrderProduct(product.product._id, product.product.name, product.product.category_id, product.product.price, product.quantity));
		
		return this.http.post<any>(this.checkoutRequestUrl, {orderProducts: JSON.stringify(orderProducts), user_id}, httpOptions).pipe(tap(result => {
                if (result) {
					if(!result.error) {
						this.clear();
						this.log(`checkout request sucessfully sent (server)`);
					}
                }
                return result;
            }),
			catchError(this.handleError<any>(`sendCheckoutRequest`))
		);
	}
}