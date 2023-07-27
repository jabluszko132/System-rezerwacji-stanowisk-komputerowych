import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskAdditionFormComponent } from './desk-addition-form/desk-addition-form.component';
import { DeskListComponent } from './desk-list/desk-list.component';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { DeskManagerService } from './desk-manager.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [DeskAdditionFormComponent, DeskListComponent],
  providers: [LocalstorageDeskListService, DeskManagerService, Validators],
  exports: [DeskAdditionFormComponent, DeskListComponent],
})
export class DeskManagementModule {}
