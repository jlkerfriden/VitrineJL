import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from "../../_services";

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

	constructor(private alertService: AlertService,
			  	private router: Router) { }

	ngOnInit() {
		
	}
	
	logout() {
        sessionStorage.removeItem('currentUser');
		this.alertService.info('You are now disconnected.', true);
		this.router.navigate(['/home']);
    }
}
