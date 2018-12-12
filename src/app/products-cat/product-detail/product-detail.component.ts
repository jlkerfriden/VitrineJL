import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, NavigationService, FullscreenImageService, CartService, AlertService } from '../../_services';
import { Product, Globals } from '../../_models';
import { FullscreenImageComponent } from "../../_directives";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	loading = false;
	product: Product;
	smallPhotoUrl = {url: ""};
	largePhotoUrl = {url: ""};
	productQuantity: number = 1;
	theme = "default";

	constructor(private activeRoute: ActivatedRoute,
				private navigationService: NavigationService,
				private fullscreenImageService: FullscreenImageService,
			  	private productService: ProductService,
			  	private cartService: CartService,
			  	private alertService: AlertService) { }

	ngOnInit() {
		this.activeRoute.params.subscribe(routeParams => {
			this.loadProductDetails(routeParams.idProduct);
			if(routeParams.idProduct.indexOf("toxic") >= 0)
				this.theme = "toxic";
		});
	}
	
	loadProductDetails(_idProduct: string) {
		this.loading = true;
		this.productService.getProduct(_idProduct).subscribe(
			result => {
				if(result) {
					this.product = result[0];
					this.productService.getCategoryName(this.product.category_id).subscribe(
						result => {
							if(result) {
								let categoryName = result[0].name;
								this.navigationService.setRoute([
									{url: "home", label: "Home"},
									{url: "products-cat/" + this.product.category_id, label: categoryName},
									{url: "products-cat/" + this.product.category_id + "/product-detail/" + this.product._id, label: this.product.name}
								]);
							}
							var instance = this;
							setTimeout(function() {
								instance.loading = false;
							}, 128);
						},
						error => {
							console.log(error);
						}
					);
					this.smallPhotoUrl.url = this.serverAddress + "/images/" + this.product.category_id + "/" + this.product._id + "/small/1.jpg";
					this.largePhotoUrl.url = this.serverAddress + "/images/" + this.product.category_id + "/" + this.product._id + "/large/1.jpg";
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	
	clickMiniature() {
		this.fullscreenImageService.showFullscreenImage(this.largePhotoUrl.url);
	}
	
	incrQuantity(_incr: number) {
		this.productQuantity = +this.productQuantity + _incr;
		this.productQuantity = Math.min(Math.max(this.productQuantity, 1), 20);
	}
	
	addToCart() {
		this.cartService.addProduct(this.product, this.productQuantity).then(res => {
			this.alertService.success(this.product.name + " (x" + this.productQuantity + ") added to your cart !");
			this.navigationService.setNotifCart(true);
		},
		err => {
			console.log(err);
		});
	}
}
