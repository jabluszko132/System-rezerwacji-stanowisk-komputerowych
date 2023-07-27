import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalstorageDeskListService } from './localstorage-desk-list.service';
// import { DeskMalfunctionsModule } from './desk-malfunctions/desk-malfunctions.module';
import { DeskManagementModule } from './desk-management/desk-management.module';
import { DeskAdditionFormComponent } from './desk-management/desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-management/desk-list/desk-list.component';
import { DeskReservationsModule } from './desk-reservations/desk-reservations.module';
import { DeskReservationFormComponent } from './desk-reservations/desk-reservation-form/desk-reservation-form.component';
import { ReservationListComponent } from './desk-reservations/reservation-list/reservation-list.component';
import { AvailableReservationHoursListComponent } from './desk-reservations/available-reservation-hours-list/available-reservation-hours-list.component';
import { DeskMalfunctionsModule } from './desk-malfunctions/desk-malfunctions.module';
import { DeskMalfunctionReportListComponent } from './desk-malfunctions/desk-malfunction-report-list/desk-malfunction-report-list.component';
import { DeskMalfunctionReportFormComponent } from './desk-malfunctions/desk-malfunction-report-form/desk-malfunction-report-form.component';
import { ReservationHoursSelectComponent } from './desk-reservations/reservation-hours-select/reservation-hours-select.component';

@NgModule({
  imports: [
    CommonModule,
    DeskManagementModule,
    DeskReservationsModule,
    DeskMalfunctionsModule,
  ],
  exports: [
    DeskAdditionFormComponent,
    DeskListComponent,
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
    ReservationHoursSelectComponent,
  ],
  providers: [LocalstorageDeskListService],
})
export class ReservationFormsAndDataModule {}
