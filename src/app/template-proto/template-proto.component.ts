import { Component, OnInit } from '@angular/core';
import { User, Breadcrumb } from "../_models";
import { UserService, NavigationService } from "../_services";

@Component({
  selector: 'app-template-proto',
  templateUrl: './template-proto.component.html',
  styleUrls: ['./template-proto.component.css']
})
export class TemplateProtoComponent implements OnInit {
	users: User[];

	constructor(private userService: UserService,
				private navigationService: NavigationService) { }

	ngOnInit() {
		this.navigationService.setRoute([{url: "home", label: "Home"}, {url: "template-proto", label: "Template"}]);
	}

	getUsers(): void {
		this.userService.getUsers().subscribe(
			users => this.users = users
		);
	}
}
