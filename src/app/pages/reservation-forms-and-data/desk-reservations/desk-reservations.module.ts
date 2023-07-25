import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { AvailableReservationHoursListComponent } from './available-reservation-hours-list/available-reservation-hours-list.component';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { DeskReservationsLsService } from './desk-reservations-ls.service';
import { ReservationHoursSelectComponent } from './reservation-hours-select/reservation-hours-select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
    ReservationHoursSelectComponent,
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
    ReservationHoursSelectComponent,
  ],
})
export class DeskReservationsModule {}
