import { Component, OnInit } from '@angular/core';
import { UserService, NavigationService } from "../_services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	constructor(private userService: UserService,
				private navigationService: NavigationService) {	}

	ngOnInit() {
		/*this.userService.getUsers().subscribe(
			result => {
				console.log(result);
			},
			error => {
				console.error(error);
			}
		);*/
		//this.navigationService.setRoute({label:"", url:""});
	}
}
