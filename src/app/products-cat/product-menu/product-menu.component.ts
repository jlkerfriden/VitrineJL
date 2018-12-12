import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {
	productCats: any[];

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this.getProductCats();
	}
	
	getProductCats() {
		this.productService.getProductCats().subscribe(
			result => {
				if(result)
					this.productCats = result;
			},
			error => {
				console.log(error);
			}
		);
	}
}
