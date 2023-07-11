import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DeskReservationFormComponent,
    LoginFormComponent,
    DeskAdditionFormComponent,
  ],
  exports: [
    DeskReservationFormComponent,
    LoginFormComponent,
    DeskAdditionFormComponent,
  ],
})
export class ReservationFormsAndDataModule {}
