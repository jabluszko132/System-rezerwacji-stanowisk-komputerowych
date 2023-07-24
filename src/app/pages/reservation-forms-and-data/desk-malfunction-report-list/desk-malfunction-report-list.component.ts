import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DeskMalfunctionReport } from '../desk-malfunction-report';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-malfunction-report-list',
  templateUrl: './desk-malfunction-report-list.component.html',
  styleUrls: ['./desk-malfunction-report-list.component.css'],
})
export class DeskMalfunctionReportListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  reports$ = this.service.getMalfunctionReports();

  ngOnInit() {
    this.reports$.subscribe();
  }

  dealtWithMalfunction(report: DeskMalfunctionReport) {
    this.service.dealtWithMalfunction(report);
  }
}
