import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsageDetailsComponent } from './usage-details/usage-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsageSummaryComponent } from './usage-summary/usage-summary.component';

const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingPageComponent },
    { path: 'score/:id', component: UsageSummaryComponent },
    { path: 'score/:id/details', component: UsageDetailsComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
