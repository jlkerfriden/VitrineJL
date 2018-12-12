import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FullscreenImageService {
    private subject = new Subject<any>();

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
				this.subject.next();
            }
        });
    }

    showFullscreenImage(imgSrc: string) {
        this.subject.next({ url: imgSrc });
    }

    getUrl(): Observable<any> {
        return this.subject.asObservable();
    }
}