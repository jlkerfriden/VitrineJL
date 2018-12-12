import { Injectable } from '@angular/core';
import { Product, Globals } from "../_models";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	private productsUrl = Globals.serverAddress+"/api/products";
	private productUrl = Globals.serverAddress+"/api/product";
	private productSearchUrl = Globals.serverAddress+"/api/productSearch";
	private productCatUrl = Globals.serverAddress+"/api/productCat";
	private productCatsUrl = Globals.serverAddress+"/api/productCats";
	
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
	
	private searchProds(searchTerm: string): Observable<Product[]> {
		let params = new HttpParams().set("search_term", searchTerm);
		return this.http.get<Product[]>(this.productSearchUrl, {headers: httpOptions.headers, params: params}).pipe(
			tap(products => this.log("fetched searched products")),
			catchError(this.handleError("searchProducts", []))
		);
	}
	
	// Public
	
	getProduct(_idProduct: string): Observable<Product> {
		let params = new HttpParams().set("product_id", _idProduct);
		return this.http.get<Product>(this.productUrl, {headers: httpOptions.headers, params: params}).pipe(
			tap((product: Product) => this.log("fetched product with id = "+_idProduct)),
			catchError(this.handleError<any>("getProduct", []))
		);
	}
	
	getProducts(_idCat: string): Observable<Product[]> {
		let params = new HttpParams().set("category_id", _idCat);
		return this.http.get<Product[]>(this.productsUrl, {headers: httpOptions.headers, params: params}).pipe(
			tap(products => this.log("fetched products")),
			catchError(this.handleError("getProducts", []))
		);
	}
	
	searchProducts(searchTerms: Observable<string>): Observable<Product[]> {
		return searchTerms.pipe(debounceTime(400))
			.pipe(distinctUntilChanged())
			.pipe(switchMap(searchTerm => this.searchProds(searchTerm)));
	}
	
	getCategoryName(_idCat: string): Observable<any> {
		let params = new HttpParams().set("category_id", _idCat);
		return this.http.get<any>(this.productCatUrl, {headers: httpOptions.headers, params: params}).pipe(
			tap(categoryName => this.log("fetched category name")),
			catchError(this.handleError("getCategoryName", []))
		);
	}
	
	getProductCats(): Observable<any[]> {
		return this.http.get<any[]>(this.productCatsUrl).pipe(
			tap(productCats => this.log("fetched product categories")),
			catchError(this.handleError("getProductCats", []))
		);
	}
}
