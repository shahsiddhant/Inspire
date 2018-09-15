import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyScoreComponent } from './energy-score/energy-score.component';

const routes: Routes = [
    { path: '', redirectTo: '/score', pathMatch: 'full' },
    { path: 'score', component: EnergyScoreComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
