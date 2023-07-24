import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { AvailableReservationHoursListComponent } from './available-reservation-hours-list/available-reservation-hours-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
  ],
})
export class DeskReservationsModule {}
