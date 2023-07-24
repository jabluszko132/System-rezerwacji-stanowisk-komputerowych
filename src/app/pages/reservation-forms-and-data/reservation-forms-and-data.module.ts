import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
// import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';
// import { DeskListComponent } from './desk-list/desk-list.component';
import { LocalstorageDeskListService } from './localstorage-desk-list.service';
// import { DeskMalfunctionsModule } from './desk-malfunctions/desk-malfunctions.module';
import { DeskManagementModule } from './desk-management/desk-management.module';
import { DeskAdditionFormComponent } from './desk-management/desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-management/desk-list/desk-list.component';
import { DeskReservationsModule } from './desk-reservations/desk-reservations.module';
import { DeskReservationFormComponent } from './desk-reservations/desk-reservation-form/desk-reservation-form.component';
import { ReservationListComponent } from './desk-reservations/reservation-list/reservation-list.component';
import { AvailableReservationHoursListComponent } from './desk-reservations/available-reservation-hours-list/available-reservation-hours-list.component';
// import { ReservationListComponent } from './reservation-list/reservation-list.component';
// import { DeskMalfunctionReportFormComponent } from './desk-malfunction-report-form/desk-malfunction-report-form.component';
// import { DeskMalfunctionReportListComponent } from './desk-malfunction-report-list/desk-malfunction-report-list.component';
// import { AvailableReservationHoursListComponent } from './available-reservation-hours-list/available-reservation-hours-list.component';

@NgModule({
  imports: [CommonModule, DeskManagementModule, DeskReservationsModule],
  exports: [
    DeskAdditionFormComponent,
    DeskListComponent,
    DeskReservationFormComponent,
    ReservationListComponent,
    AvailableReservationHoursListComponent,
    // DeskListComponent,
    // ReservationListComponent,
    // DeskMalfunctionReportFormComponent,
    // DeskMalfunctionReportListComponent,
  ],
  providers: [LocalstorageDeskListService],
})
export class ReservationFormsAndDataModule {}
