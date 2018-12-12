import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './_guards';
import { HomeComponent } from './home';
import { ProductsCatComponent, ProductDetailComponent } from './products-cat';
import { AboutUsComponent } from './about-us';
import { ContactComponent } from './contact';
import { SignInComponent } from './sign-in';
import { RegisterComponent } from './register';
import { TemplateProtoComponent } from './template-proto';
import { AccountComponent, AccountSummaryComponent, AccountSettingsComponent, AccountOrdersComponent } from './account';
import { CartComponent } from './cart';
import { BackendComponent } from './backend';




const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "about-us", component: AboutUsComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "home", component: HomeComponent },
	{ path: "products-cat",
		children: [
			{ path: ":idCat", component: ProductsCatComponent },
			{ path: ":idCat/product-detail/:idProduct", component: ProductDetailComponent },
		]
	},
	
	{ path: "register", component: RegisterComponent },
	{ path: "sign-in", component: SignInComponent },
	{ path: "template-proto", component: TemplateProtoComponent },
	{ path: "account", component: AccountComponent, canActivate: [AuthGuard], 
		children: [
			{ path: "", redirectTo: "summary", pathMatch: "full" },
			{ path: "summary", component: AccountSummaryComponent },
			{ path: "settings", component: AccountSettingsComponent },
			{ path: "cart", component: CartComponent },
			{ path: "orders", component: AccountOrdersComponent },
		]
	},
	{ path: "cart", component: CartComponent },
	{ path: "backend", component: BackendComponent },
	{ path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
	exports: [
		RouterModule
	],
  declarations: []
})
export class AppRoutingModule { }