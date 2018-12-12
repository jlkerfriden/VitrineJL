import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './_guards';
import { AlertComponent, FullscreenImageComponent, FullscreenImageDirective } from './_directives';
import { AlertService, FullscreenImageService, NavigationService } from './_services';
import { HomeComponent } from './home';
import { ProductsCatComponent, ProductListComponent, ProductDetailComponent, ProductMenuComponent, ProductPhotosComponent } from './products-cat';
import { AboutUsComponent } from './about-us';
import { ContactComponent } from './contact';
import { SignInComponent } from './sign-in';
import { RegisterComponent } from './register';
import { NavigationComponent } from './navigation';
import { TemplateProtoComponent } from './template-proto';
import { AccountComponent, AccountMenuComponent, AccountSummaryComponent, AccountSettingsComponent, AccountOrdersComponent } from './account';
import { CartComponent } from './cart';
import { BackendComponent } from './backend';
import { HeaderComponent } from './header';

@NgModule({
	declarations: [
		AppComponent,
		AlertComponent,
		FullscreenImageComponent,
		FullscreenImageDirective,
		HomeComponent,
		ProductsCatComponent,
		AboutUsComponent,
		ContactComponent,
		SignInComponent,
		RegisterComponent,
		TemplateProtoComponent,
		NavigationComponent,
		AccountComponent,
		AccountMenuComponent,
		AccountSummaryComponent,
		AccountSettingsComponent,
		AccountOrdersComponent,
		ProductListComponent,
		ProductDetailComponent,
		ProductMenuComponent,
		ProductPhotosComponent,
		CartComponent,
		BackendComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	exports: [
		
	],
	providers: [
		AlertService,
		FullscreenImageService,
		NavigationService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
