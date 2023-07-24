import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { AvailableReservationHoursListComponent } from './available-reservation-hours-list/available-reservation-hours-list.component';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { DeskReservationsLsService } from './desk-reservations-ls.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
  ],
  providers: [
    LocalstorageDeskListService,
    DeskReservationsLsService,
    Validators,
  ],
  exports: [
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
  ],
})
export class DeskReservationsModule {}
