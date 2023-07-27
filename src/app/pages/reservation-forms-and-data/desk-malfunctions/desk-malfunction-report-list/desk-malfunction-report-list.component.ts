import { Component, OnInit } from '@angular/core';
import { DeskMalfunctionReport } from '../../interfaces/desk-malfunction-report';
import { DeskMalfunctionReporterService } from '../desk-malfunction-reporter.service';

@Component({
  selector: 'app-desk-malfunction-report-list',
  templateUrl: './desk-malfunction-report-list.component.html',
  styleUrls: ['./desk-malfunction-report-list.component.css'],
})
export class DeskMalfunctionReportListComponent implements OnInit {
  constructor(private service: DeskMalfunctionReporterService) {}
  reports$ = this.service.getMalfunctionReports();

  dealtWithMalfunction(report: DeskMalfunctionReport) {
    this.service.dealtWithMalfunction(report);
  }

  ngOnInit() {
    this.reports$.subscribe();
  }
}
