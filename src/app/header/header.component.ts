import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from "../_services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	searchTerm: string;
	searchDelayFunction: any;
	notifCart: boolean;
	notifAccount: boolean;
	
	constructor(private activeRoute: ActivatedRoute,
				private navigationService: NavigationService,
				private router: Router) {	}

	ngOnInit() {
		/*setTimeout(() => {
			this.router.navigateByUrl("/products-cat/keycaps");
		}, 1024);*/
		this.navigationService.getNotifCart().subscribe(notif => {
			this.notifCart = notif;
		});
	}
	
	searchProducts() {
		clearTimeout(this.searchDelayFunction);
		this.searchDelayFunction = setTimeout(() => {
			if(this.router.url.indexOf("products-cat") == -1 || this.router.url.indexOf("product-detail") !== -1) {
				this.router.navigateByUrl("/products-cat/search").then(res => {
					this.searchDelayFunction = setTimeout(() => {
						this.navigationService.setSearchTerm(this.searchTerm);
					}, 256);
				},
				err => {
					console.log(err);
				});
			}
			else {
				this.navigationService.setSearchTerm(this.searchTerm);
			}
		}, 256);
	}
}
