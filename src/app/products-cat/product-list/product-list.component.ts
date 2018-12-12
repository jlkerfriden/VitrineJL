import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from "rxjs";
import { ProductService, NavigationService } from '../../_services';
import { Product, Globals } from '../../_models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	products: Product[];
	searchedProducts: Product[];
	displaySearchResults = false;
	categoryName: string;
	searchTerm: string;
	searchTerm$ = new Subject<string>();
	loading = false;

	constructor(private activeRoute: ActivatedRoute,
			  	private productService: ProductService,
				private navigationService: NavigationService) { }

	ngOnInit() {
		this.activeRoute.params.subscribe(routeParams => {
			//this.searchTerm = routeParams.searchTerm//"";
			//if(this.searchTerm) {
				//this.displaySearchResults = true;
			//	this.searchProducts();
			//	console.log(this.searchTerm);
			//}
			//else {
				this.displaySearchResults = false;
			//}
			if(routeParams.idCat != "search") {
				this.loadProductList(routeParams.idCat);
				this.loadCategoryName(routeParams.idCat);
			}
		});
		this.productService.searchProducts(this.searchTerm$)
			.subscribe(results => {
				this.searchedProducts = results;
				if(this.searchTerm == "")
					this.displaySearchResults = false;
				else
					this.displaySearchResults = true;
				this.loading = false;
		});
		this.navigationService.getSearchTerm().subscribe(results => {
			this.searchTerm = results;
			this.searchProducts();
		});
	}
	
	loadProductList(_idCat: string) {
		this.productService.getProducts(_idCat).subscribe(
			result => {
				if(result) {
					this.products = result;
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	
	loadCategoryName(_idCat: string) {
		this.loading = true;
		this.productService.getCategoryName(_idCat).subscribe(
			result => {
				if(result) {
					this.categoryName = result[0].name;
					this.navigationService.setRoute([{url: "home", label: "Home"}, {url: "products-cat/" + _idCat, label: this.categoryName}]);
				}
				var instance = this;
				setTimeout(function() {
					instance.loading = false;
				}, 128);
			},
			error => {
				console.log(error);
				this.loading = false;
			}
		);
	}
	
	searchProducts() {
		if(this.searchTerm == "") {
			this.displaySearchResults = false;
		}
		else {
			this.loading = true;
			this.searchTerm$.next(this.searchTerm);
		}
	}
	
	public loadDefaultPreview(test): void {
		console.log(test);
	}
}
