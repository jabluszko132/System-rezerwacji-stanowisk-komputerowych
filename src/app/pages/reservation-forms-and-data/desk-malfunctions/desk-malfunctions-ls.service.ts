import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { Desk } from '../interfaces/desk';
import { DeskMalfunctionReport } from '../interfaces/desk-malfunction-report';
import { NumberRange } from '../interfaces/number-range';
import { DeskManagementLSService } from '../desk-management/desk-management-ls.service';
@Injectable()
export class DeskMalfunctionsLSService {
  constructor(private lsDeskService: DeskManagementLSService) {
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
    if (this.lsDeskService.deskExists(report.deskID)) {
      this.lsDeskService.updateDeskFunctionality(report.deskID, false);
      this.malfunctionReports.push(report);
      this.pushMalfunctionReportsToLS();
      return of(true);
    }
    alert('Nie ma takiego stanowiska');
    return of(false);
  }

  dealtWithMalfunction(report: DeskMalfunctionReport): Observable<boolean> {
    let reportIndex = this.malfunctionReports.findIndex(
      (m: any) => m == report
    );
    if (reportIndex == -1) {
      alert('Nie ma reportu o takiej usterce');
      return of(false);
    }
    if (this.malfunctionReports[reportIndex].dealtWith) {
      alert('Ta usterka już była nieaktualna');
      return of(false);
    }
    this.malfunctionReports[reportIndex].dealtWith = true;
    this.pushMalfunctionReportsToLS();
    if (
      this.lsDeskService.deskExists(report.deskID) &&
      !this.areMalfunctionsOnDesk(report.deskID)
    ) {
      this.lsDeskService.updateDeskFunctionality(report.deskID, true);
    }
    return of(true);
  }

  areMalfunctionsOnDesk(deskID: number): boolean {
    return (
      this.malfunctionReports.findIndex(
        (m: any) => m.deskID == deskID && m.dealtWith == false
      ) != -1
    );
  }

  // things regarding malfunctions from localstorage-desk-list service will be here
}
