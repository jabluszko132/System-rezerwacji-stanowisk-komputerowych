import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskReservationFormComponent } from './desk-reservation-form/desk-reservation-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-list/desk-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalstorageDeskListService } from './localstorage-desk-list.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    DeskReservationFormComponent,
    LoginFormComponent,
    DeskAdditionFormComponent,
    DeskListComponent,
  ],
  exports: [
    DeskReservationFormComponent,
    LoginFormComponent,
    DeskAdditionFormComponent,
    DeskListComponent,
  ],
  providers: [LocalstorageDeskListService],
})
export class ReservationFormsAndDataModule {}
