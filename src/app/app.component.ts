import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
	
	
export class AppComponent {
	title = 'Vitrine';
	navigation = false;
	
	toggleNav() {
		this.navigation = !this.navigation;
	}
	
	updateNav(nav: boolean) {
		this.navigation = nav;
	}
}
