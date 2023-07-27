import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskMalfunctionReportListComponent } from './desk-malfunction-report-list/desk-malfunction-report-list.component';
import { DeskMalfunctionReportFormComponent } from './desk-malfunction-report-form/desk-malfunction-report-form.component';
import { DeskMalfunctionReporterService } from './desk-malfunction-reporter.service';
import { DeskManagerService } from '../desk-management/desk-manager.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
  ],
  providers: [DeskMalfunctionReporterService, DeskManagerService, Validators],
  exports: [
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
  ],
})
export class DeskMalfunctionsModule {}
