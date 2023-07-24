import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DeskMalfunctionReport } from '../../interfaces/desk-malfunction-report';
import { LocalstorageDeskListService } from '../../localstorage-desk-list.service';
import { DeskMalfunctionsLSService } from '../desk-malfunctions-ls.service';

@Component({
  selector: 'app-desk-malfunction-report-list',
  templateUrl: './desk-malfunction-report-list.component.html',
  styleUrls: ['./desk-malfunction-report-list.component.css'],
})
export class DeskMalfunctionReportListComponent implements OnInit {
  constructor(private service: DeskMalfunctionsLSService) {}
  reports$ = this.service.getMalfunctionReports();

  ngOnInit() {
    this.reports$.subscribe();
  }

  dealtWithMalfunction(report: DeskMalfunctionReport) {
    this.service.dealtWithMalfunction(report);
  }
}
