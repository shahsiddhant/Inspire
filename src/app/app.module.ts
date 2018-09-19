import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsageDetailsComponent } from './usage-details/usage-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ComponentModule } from './shared/components/components.module';
import { UsageSummaryComponent } from './usage-summary/usage-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    UsageSummaryComponent,
    UsageDetailsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
