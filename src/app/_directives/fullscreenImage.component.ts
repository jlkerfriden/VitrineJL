import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullscreenImageService } from '../_services';


@Component({
    selector: 'fullscreenImage',
    templateUrl: './fullscreenImage.component.html',
	styleUrls: ['./fullscreenImage.component.css']
})

export class FullscreenImageComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    url: any;
	activated = false;
	showZoom = false;
	xPos = 50;
	yPos = 50;
	totalMovement: number;
	prevTouchPos = {x:0, y:0};
	
    constructor(private fullscreenImageService: FullscreenImageService) { }

    ngOnInit() {
        this.subscription = this.fullscreenImageService.getUrl().subscribe(url => { 
            this.url = url;
			this.activated = true;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    close() {
		this.activated = false;
    }
	
	touchstart(event: any) {
		this.totalMovement = 0;
		this.openZoom(event, true);
	}
	
	touchend(event: any) {
		if(this.totalMovement < 10) {
			this.showZoom = false;
			this.activated = false;
		}
		else {
			this.openZoom(event, false);
		}
	}
	
	touchmove(event: any) {
		this.totalMovement += Math.abs(this.prevTouchPos.x - event.touches[0].pageX) + Math.abs(this.prevTouchPos.y - event.touches[0].pageY);
		this.prevTouchPos.x = event.touches[0].pageX;
		this.prevTouchPos.y = event.touches[0].pageY;
		this.positionZoom(event);
	}
	
	
	openZoom(event: any, show: boolean) {
		event.preventDefault();
		this.showZoom = show;
		if (show) {
			this.positionZoom(event);
		}
	}
	
	positionZoom(event) {
		let xPos = event.touches[0].pageX - event.touches[0].target.offsetLeft
		let yPos = event.touches[0].pageY - event.touches[0].target.offsetTop;
		let xMax = event.target.clientWidth;
		let yMax = event.target.clientHeight;
		this.xPos = this.validPercent(Math.round(xPos * 100 / xMax));
		this.yPos = this.validPercent(Math.round(yPos * 100 / yMax));
		
		console.log(this.xPos + " ; " + this.yPos)
	}
	
	validPercent(value) {
		if (value < 0) {
			 this.showZoom = false;
			return 0;
		}
		else if (value > 100) {
			 this.showZoom = false;
			return 100
		}
		return value;
	}
}