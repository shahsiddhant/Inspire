import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyScoreComponent } from './energy-score/energy-score.component';
import { UsageDetailsComponent } from './usage-details/usage-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'score/1', pathMatch: 'full' },
    // { path: 'landing' },
    { path: 'score/:id', component: EnergyScoreComponent },
    { path: 'score/:id/details', component: UsageDetailsComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
