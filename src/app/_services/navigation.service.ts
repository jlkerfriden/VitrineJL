import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Breadcrumb } from '../_models';

@Injectable()
export class NavigationService {
    private subject = new Subject<any>();
    private subjectSearchTerms = new Subject<any>();
    private subjectNotifCart = new Subject<boolean>();
    //private subjectNotifAccount = new Subject<boolean>();

	constructor(private router: Router) {
		router.events.subscribe(event => {
			if (event instanceof NavigationStart)
				this.subject.next();
		});
	}

	setRoute(route: Breadcrumb[]) {
		this.subject.next(route);
	}

	getRoute(): Observable<Array<Breadcrumb>> {
		return this.subject.asObservable();
	}

	setSearchTerm(searchTerm: string) {
		this.subjectSearchTerms.next(searchTerm);
	}

	getSearchTerm(): Observable<string> {
		return this.subjectSearchTerms.asObservable();
	}

	getNotifCart(): Observable<boolean> {
		return this.subjectNotifCart.asObservable();
	}

	setNotifCart(notif: boolean) {
        this.subjectNotifCart.next(notif);
    }
}