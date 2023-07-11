import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { Error404Component } from './error404/error404.component';
import { ReservationFormsAndDataModule } from './reservation-forms-and-data/reservation-forms-and-data.module';

@NgModule({
  declarations: [
    MainPageComponent,
    ReservationPageComponent,
    Error404Component,
  ],
  imports: [CommonModule, ReservationFormsAndDataModule],
  exports: [],
})
export class PagesModule {}
