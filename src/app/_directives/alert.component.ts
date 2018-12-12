import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
	timeoutClear: any;
	timeoutHide: any;
	mustHide = false;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
			clearTimeout(this.timeoutClear);
			clearTimeout(this.timeoutHide);
			this.mustHide = false;
			this.timeoutClear = setTimeout(() => {
				this.mustHide = true;
				this.timeoutHide = setTimeout(() => {
					this.mustHide = false;
					this.message = null;
				}, 512);
			}, 4096);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}