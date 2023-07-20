import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from './reservation';
import { Desk } from './desk';
import { DeskMalfunctionReport } from './desk-malfunction-report';
const date = new Date();

@Injectable()
export class LocalstorageDeskListService {
  constructor() {
    this.forceReservationListRefresh();
    this.forceDeskListRefresh();
    this.forceMalfunctionReportsRefresh();
  }

  private currentDateString(): string {
    return (
      date.getFullYear().toString().padStart(4, '0') +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
  }
  value: any;
  reservationList: Reservation[] = [];
  deskList: Desk[] = [];
  malfunctionReports: DeskMalfunctionReport[] = [];

  getReservationList(): Observable<Reservation[]> {
    // this.deleteExpiredReservations();
    return of(this.reservationList);
  }

  getDeskList(): Observable<Desk[]> {
    return of(this.deskList);
  }

  getMalfunctionReports(): Observable<DeskMalfunctionReport[]> {
    return of(this.malfunctionReports);
  }

  /**
   * Forces this instance's local deskList value to change to the one in localStorage
   *
   */
  private forceDeskListRefresh(): void {
    this.value = localStorage.getItem('deskList');
    this.deskList = this.value ? JSON.parse(this.value) : [];
  }

  /**
   * Forces this instance's local reservationList value to change to the one in localStorage
   */
  private forceReservationListRefresh(): void {
    this.value = localStorage.getItem('reservationList');
    this.reservationList = this.value ? JSON.parse(this.value) : [];
  }

  private forceMalfunctionReportsRefresh(): void {
    this.value = localStorage.getItem('malfunctionReports');
    this.malfunctionReports = this.value ? JSON.parse(this.value) : [];
  }

  /**
   * Updates localStorage deskList to local deskList's value
   */
  private pushDeskListToLS(): void {
    // this.sortDeskList();
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
  }

  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushReservationListToLS(): void {
    this.sortReservationListByDate();
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
  }

  private pushMalfunctionReportsToLS(): void {
    localStorage.setItem(
      'malfunctionReports',
      JSON.stringify(this.malfunctionReports)
    );
  }

  // private sortDeskList(): void {
  //   this.deskList.sort((a, b) => a.deskID - b.deskID);
  // }

  private sortReservationListByDate(): void {
    this.reservationList.sort((a, b) => {
      if (a.reservationDate > b.reservationDate) return 1;
      if (a.reservationDate < b.reservationDate) return -1;
      return 0;
    });
  }

  /**
   * Adds desk to deskList (both service's and localStorage)
   *
   *
   */

  addDesk(newDesk: Desk): Observable<boolean> {
    /**@Issues
     * Somehow somewhere during v1 of this function the of(this.deskList)
     * observables (previously passed by getDeskList()) bug out and
     * stop passing values.
     *
     * But somehow the v2 works even though its less optimal. May be that refreshing the list
     * during that function bugs it out */

    // --------------- 1st version (see: @Issues) ----------------
    // this.forceDeskListRefresh();
    // if (this.deskList.find((m: any) => m.deskID === newDesk.deskID)) {
    //   alert('stanowisko już istnieje');
    //   return of(false);
    // }
    // this.deskList.push(newDesk);
    // this.pushDeskListToLS();
    // console.log(this.deskList);
    // return of(true);
    // ------------------ 2nd version ---------------------------
    let deskListInLS: any = localStorage.getItem('deskList') ?? '[]';
    deskListInLS = JSON.parse(deskListInLS as string) ?? [];
    if (deskListInLS.find((m: any) => m.deskID === newDesk.deskID)) {
      alert('stanowisko już istnieje');
      return of(false);
    }
    this.deskList.push(newDesk);
    this.pushDeskListToLS();
    return of(true);
  }

  private addReservationOnNewDate(reserveObj: Reservation): void {
    this.reservationList.push(reserveObj);
    this.pushReservationListToLS();
  }

  reserveDesk(reserveObj: Reservation): Observable<boolean> {
    if (reserveObj.reservationDate < this.currentDateString()) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return of(false);
    }
    let deskListInLS: any = localStorage.getItem('deskList');
    if (deskListInLS != null) {
      deskListInLS = JSON.parse(deskListInLS);
      let deskIndex: number = deskListInLS.findIndex(
        (m: any) => m.deskID == reserveObj.deskID
      );
      if (deskIndex == -1) {
        alert('Nie ma takiego stanowiska');
        return of(false);
      }
      if (!deskListInLS[deskIndex].functional) {
        alert('To stanowisko jest niesprawne. Zarezerwuj inne');
        return of(false);
      }
      let reservationListInLS: any = localStorage.getItem('reservationList');
      if (reservationListInLS != null) {
        reservationListInLS = JSON.parse(reservationListInLS);
        if (
          !reservationListInLS.find(
            (m: any) =>
              m.deskID == reserveObj.deskID &&
              m.reservationDate == reserveObj.reservationDate
          )
        ) {
          this.addReservationOnNewDate(reserveObj);
          return of(true);
        } else {
          alert('To stanowisko już jest zarezerwowane w tym dniu');
        }
      } else {
        this.addReservationOnNewDate(reserveObj);
        return of(true);
      }
    } else {
      alert(
        'Lista stanowisk jest pusta. Dodaj stanowisko aby móc je zarezerwować'
      );
    }
    return of(false);
  }

  deleteDesk(desk: Desk): Observable<Boolean> {
    let deskToDeleteIndex: number = this.deskList.indexOf(desk);
    if (deskToDeleteIndex == -1) {
      alert('Nie ma takiego stanowiska');
      return of(false);
    }
    if (this.reservationList.find((m: any) => m.deskID == desk.deskID)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
      // if (confirm('Czy chcesz usunąć wszystkie rezerwacje na to stanowisko?'))
      //   this.deleteReservationsOnDesk(desk); else
      return of(false);
    }
    this.deskList.splice(deskToDeleteIndex, 1);
    this.pushDeskListToLS();
    return of(true);
  }

  deleteReservation(reservation: Reservation): Observable<Boolean> {
    let reservationToDeleteIndex: number =
      this.reservationList.indexOf(reservation);
    if (reservationToDeleteIndex == -1) {
      alert('Nie ma takiej rezerwacji');
      return of(false);
    }
    this.reservationList.splice(reservationToDeleteIndex, 1);
    this.pushReservationListToLS();
    return of(true);
  }

  /**
   * This is an unsafe but faster version of deleteReservation method.
   * It doesnt check if the reservation exists on the table. Dont use it
   * unless you are absolutely sure that the element exists
   */
  // private unsafeDeleteReservation(reservation: Reservation) {
  //   try {
  //     this.reservationList.splice(this.reservationList.indexOf(reservation), 1);
  //     this.pushReservationListToLS();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   console.log('deleted reservation and pushed');
  // }

  // deleteExpiredReservations(): void {
  //   let currentDate = this.currentDateString();
  //   for (let reservation of this.reservationList) {
  //     if (reservation.reservationDate < currentDate) {
  //       this.unsafeDeleteReservation(reservation);
  //     } else return;
  //   }
  // }

  // deleteReservationsOnDesk(desk: Desk): void {
  //   let reservationIndex: number = this.reservationList.findIndex((m: any) => {
  //     m.deskID == desk.deskID;
  //   });
  //   console.log(reservationIndex);
  //   while (reservationIndex != -1) {
  //     this.unsafeDeleteReservation(this.reservationList[reservationIndex]);
  //     reservationIndex = this.reservationList.findIndex((m: any) => {
  //       m.deskID == desk.deskID;
  //     });
  //   }
  // }

  reportMalfunctionOnDesk(report: DeskMalfunctionReport): Observable<boolean> {
    let reportedDeskIndex: number = this.deskList.findIndex(
      (m) => m.deskID == report.deskID
    );
    if (reportedDeskIndex != -1) {
      this.deskList[reportedDeskIndex].functional = false;
      this.malfunctionReports.push(report);
      this.pushMalfunctionReportsToLS();
      this.pushDeskListToLS();
      return of(true);
    }
    alert('Nie ma takiego stanowiska');
    return of(false);
  }

  dealtWithMalfunction(raport: DeskMalfunctionReport): Observable<boolean> {
    let raportIndex = this.malfunctionReports.findIndex(
      (m: any) => m == raport
    );
    if (raportIndex == -1) {
      alert('Nie ma raportu o takiej usterce');
      return of(false);
    }
    if (this.malfunctionReports[raportIndex].dealtWith) {
      alert('Ta usterka już była nieaktualna');
      return of(false);
    }
    this.malfunctionReports[raportIndex].dealtWith = true;
    this.pushMalfunctionReportsToLS();
    let deskIndex = this.deskList.findIndex(
      (m: any) => m.deskID == this.malfunctionReports[raportIndex].deskID
    );
    if (deskIndex != -1) {
      this.deskList[deskIndex].functional = true;
      this.pushDeskListToLS();
    }
    return of(true);
  }

  //todo
  //add hours to reservations
  //add 'functional' variable to desks and make the reservations possible only on true
  //finish deleteReservationsOnDesk function
}
