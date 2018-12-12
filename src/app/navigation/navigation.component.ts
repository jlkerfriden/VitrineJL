import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Globals, Breadcrumb } from "../_models";
import { AlertService, NavigationService } from "../_services";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	sessionStrage;
	@Input() navigation;
	@Output() navChanged = new EventEmitter<boolean>();
	mobile = (window.innerWidth <= Globals.mobileWidth);
	currentRoute: Breadcrumb[];
	
	constructor(private alertService: AlertService,
				private navigationService: NavigationService,
				private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
				this.currentRoute = [];
            }
        });
    }

	ngOnInit() {
		this.sessionStrage = sessionStorage;
		this.navigationService.getRoute().subscribe(route => {
			if(route) {
				setTimeout(() => {
					this.currentRoute = route;
				});
			}
		});
	}
	
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if(window.innerWidth <= Globals.mobileWidth)
			this.mobile = true;
		else
			this.mobile = false;
	}
	
	toggleNav() {
		this.navChanged.emit(!this.navigation);
	}
	
	logout() {
        sessionStorage.removeItem('currentUser');
		this.alertService.info('You are now disconnected.', true);
    }
}
