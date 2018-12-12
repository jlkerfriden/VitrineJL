import { Component, Input, OnInit } from '@angular/core';
import { FullscreenImageService } from '../../_services';
import { Product, Globals } from '../../_models';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css']
})
export class ProductPhotosComponent implements OnInit {
	serverAddress = Globals.serverAddress;
	@Input() product: Product;
	@Input() largePhotoUrl;
	@Input() smallPhotoUrl;
	photos = new Array();
	

	constructor(private fullscreenImageService: FullscreenImageService) { }

	ngOnInit() {
		this.loadPhoto(1);
	}
	
	loadPhoto(imgNum: number) {
		let imgTemp = new Image();
		imgTemp.src = this.serverAddress + "/images/" + this.product.category_id + "/" + this.product._id + "/small/" + imgNum + ".jpg";
		imgTemp.onload = () => {
			let largeSrc = this.serverAddress + "/images/" + this.product.category_id + "/" + this.product._id + "/large/" + imgNum + ".jpg";
			let smallSrc = this.serverAddress + "/images/" + this.product.category_id + "/" + this.product._id + "/small/" + imgNum + ".jpg";
			this.photos.push({ img: imgTemp, smallSrc, largeSrc });
			this.loadPhoto(imgNum+1);
		}
	}
	
	hoverMiniature(newSmallSrc: string, newLargeSrc: string) {
		this.smallPhotoUrl.url = newSmallSrc;
		this.largePhotoUrl.url = newLargeSrc;
	}
	
	clickMiniature(fullScreen: string) {
		this.fullscreenImageService.showFullscreenImage(fullScreen);
	}
}
