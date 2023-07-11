import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ReservationPageComponent,
    Error404Component,
  ],
  imports: [CommonModule],
  exports: [],
})
export class PagesModule {}
