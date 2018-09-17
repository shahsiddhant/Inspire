import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { InfoCardsComponent } from './info-cards/info-cards.component';


@NgModule({
    declarations: [
        InfoCardsComponent
    ],
    exports: [
        InfoCardsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule
    ]
})
export class ComponentModule { }
