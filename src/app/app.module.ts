import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EnergyScoreComponent } from './energy-score/energy-score.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsageDetailsComponent } from './usage-details/usage-details.component';


@NgModule({
  declarations: [
    AppComponent,
    EnergyScoreComponent,
    UsageDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
