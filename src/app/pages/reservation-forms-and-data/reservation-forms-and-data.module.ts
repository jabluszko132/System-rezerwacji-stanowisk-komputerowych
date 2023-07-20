import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-list/desk-list.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageDeskListService } from './localstorage-desk-list.service';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { DeskMalfunctionReportFormComponent } from './desk-malfunction-report-form/desk-malfunction-report-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    DeskReservationFormComponent,
    DeskAdditionFormComponent,
    DeskListComponent,
    ReservationListComponent,
    DeskMalfunctionReportFormComponent,
  ],
  exports: [
    DeskReservationFormComponent,
    DeskAdditionFormComponent,
    DeskListComponent,
    ReservationListComponent,
    DeskMalfunctionReportFormComponent,
  ],
  providers: [LocalstorageDeskListService, Validators],
})
export class ReservationFormsAndDataModule {}
