import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskMalfunctionReportListComponent } from './desk-malfunction-report-list/desk-malfunction-report-list.component';
import { DeskMalfunctionReportFormComponent } from './desk-malfunction-report-form/desk-malfunction-report-form.component';
import { DeskMalfunctionsLSService } from './desk-malfunctions-ls.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DeskMalfunctionReportListComponent,
    DeskMalfunctionReportFormComponent,
  ],
  providers: [DeskMalfunctionsLSService],
})
export class DeskMalfunctionsModule {}
