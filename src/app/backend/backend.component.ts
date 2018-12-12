import { Component, OnInit } from '@angular/core';
import { AlertService, BackendService } from "../_services";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

	constructor(private alertService: AlertService,
				private backendService: BackendService) { }

	ngOnInit() {
		
	}

	
	// Private

	private addCountry(name: string) {
		this.backendService.addCountry(name).subscribe(
			(result: any) => {
				if(!result) {
					this.alertService.error("Error, can't add country");
				}
				else {
					if(result.error) {
						this.alertService.error(result.message, true);
					}
					else {
						this.alertService.success('Country added', true);
						console.log(result);
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
