import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReservationDataHandlerService } from './reservation-data-handler.service';

@NgModule({
  imports: [CommonModule],
  declarations: [DeskReservationFormComponent, LoginFormComponent],
  exports: [DeskReservationFormComponent, LoginFormComponent],
  providers: [ReservationDataHandlerService],
})
export class ReservationFormsAndDataModule {}
