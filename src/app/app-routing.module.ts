import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyScoreComponent } from './energy-score/energy-score.component';
import { UsageDetailsComponent } from './usage-details/usage-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingPageComponent },
    { path: 'score/:id', component: EnergyScoreComponent },
    { path: 'score/:id/details', component: UsageDetailsComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
