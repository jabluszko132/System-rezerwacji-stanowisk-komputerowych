import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskMalfunctionReportListComponent } from './desk-malfunction-report-list/desk-malfunction-report-list.component';
import { DeskMalfunctionReportFormComponent } from './desk-malfunction-report-form/desk-malfunction-report-form.component';
import { DeskMalfunctionsLSService } from './desk-malfunctions-ls.service';
import { DeskManagementLSService } from '../desk-management/desk-management-ls.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
  ],
  providers: [DeskMalfunctionsLSService, DeskManagementLSService, Validators],
  exports: [
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
  ],
})
export class DeskMalfunctionsModule {}
