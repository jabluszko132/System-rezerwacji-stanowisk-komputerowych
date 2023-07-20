import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DeskMalfunctionReport } from '../desk-malfunction-report';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

const endSubs$: Subject<null> = new Subject<null>;

@Component({
  selector: 'app-desk-malfunction-report-list',
  templateUrl: './desk-malfunction-report-list.component.html',
  styleUrls: ['./desk-malfunction-report-list.component.css'],
})
export class DeskMalfunctionReportListComponent implements OnInit, OnDestroy {
  constructor(private service : LocalstorageDeskListService) {}
  reports$ = this.service.getMalfunctionReports();

  ngOnInit() {
    this.reports$.pipe(takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }
  
  dealtWithMalfunction(report:DeskMalfunctionReport) {
    this.service.dealtWithMalfunction(report);
  }
}
