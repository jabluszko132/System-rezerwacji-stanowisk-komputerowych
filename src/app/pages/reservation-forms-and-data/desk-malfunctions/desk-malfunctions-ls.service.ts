import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { Desk } from '../interfaces/desk';
import { DeskMalfunctionReport } from '../interfaces/desk-malfunction-report';
import { NumberRange } from '../interfaces/number-range';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { DeskManagementLSService } from '../desk-management/desk-management-ls.service';
@Injectable()
export class DeskMalfunctionsLSService {
  constructor(private deskListService: DeskManagementLSService) {
    this.forceMalfunctionReportsRefresh();
  }
  malfunctionReports: DeskMalfunctionReport[] = [];
  value: any;

  getMalfunctionReports(): Observable<DeskMalfunctionReport[]> {
    return of(this.malfunctionReports);
  }

  private forceMalfunctionReportsRefresh(): void {
    this.value = localStorage.getItem('malfunctionReports');
    this.malfunctionReports = this.value ? JSON.parse(this.value) : [];
  }

  private pushMalfunctionReportsToLS(): void {
    localStorage.setItem(
      'malfunctionReports',
      JSON.stringify(this.malfunctionReports)
    );
  }

  reportMalfunctionOnDesk(report: DeskMalfunctionReport): Observable<boolean> {
    if (this.deskListService.deskExists(report.deskID)) {
      this.deskListService.updateDeskFunctionality(report.deskID, false);
      this.malfunctionReports.push(report);
      this.pushMalfunctionReportsToLS();
      return of(true);
    }
    alert('Nie ma takiego stanowiska');
    return of(false);
  }

  // things regarding malfunctions from localstorage-desk-list service will be here
}
