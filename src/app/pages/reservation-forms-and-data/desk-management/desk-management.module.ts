import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-list/desk-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DeskAdditionFormComponent, DeskListComponent],
})
export class DeskManagementModule {}
