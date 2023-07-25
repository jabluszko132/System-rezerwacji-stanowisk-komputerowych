import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Reservation } from './interfaces/reservation';
import { Desk } from './interfaces/desk';
import { DeskMalfunctionReport } from './interfaces/desk-malfunction-report';
import { NumberRange } from './interfaces/number-range';
import { DeskReservationsLsService } from './desk-reservations/desk-reservations-ls.service';
const date = new Date();

@Injectable()
export class LocalstorageDeskListService {
  constructor() {
    this.forceReservationListRefresh();
    this.forceDeskListRefresh();
  }
  value: any;
  reservationList: Reservation[] = [];
  reservationList$: BehaviorSubject<Reservation[]> = new BehaviorSubject<
    Reservation[]
  >(this.reservationList);
  deskList: Desk[] = [];

  getReservationList(): BehaviorSubject<Reservation[]> {
    return this.reservationList$;
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
    this.reservationList$.next(this.reservationList);
  }
  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushReservationListToLS(): void {
    this.sortReservationListByDate(this.reservationList);
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
    this.reservationList$.next(this.reservationList);
  }
  // private sortDeskList(): void {
  //   this.deskList.sort((a, b) => a.deskID - b.deskID);
  // }
  private sortReservationListByDate(list: Reservation[]): void {
    list.sort((a, b) => {
      if (a.reservationDate > b.reservationDate) return 1;
      if (a.reservationDate < b.reservationDate) return -1;
      return 0;
    });
  }
  /**
   * This is an unsafe but faster version of deleteReservation method.
   * It doesnt check if the reservation exists on the table. Dont use it
   * unless you are absolutely sure that the element exists
   */
  private unsafeDeleteReservation(reservation: Reservation) {
    try {
      this.reservationList.splice(
        this.reservationList.findIndex((m: any) => m == reservation),
        1
      );
      this.pushReservationListToLS();
    } catch (e) {
      console.error(e);
    }
  }
  // deleteExpiredReservations(): void {
  //   let currentDate = this.currentDateString();
  //   for (let reservation of this.reservationList) {
  //     if (reservation.reservationDate < currentDate) {
  //       this.unsafeDeleteReservation(reservation);
  //     } else return;
  //   }
  // }
  hasAnyReservations(desk: Desk): boolean {
    this.forceReservationListRefresh();
    return (
      this.reservationList.findIndex((m: any) => m.deskID == desk.deskID) != -1
    );
  }

  canDeskBeDeleted(desk: Desk): boolean {
    if (this.hasAnyReservations(desk)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
      if (confirm('Czy chcesz usunąć wszystkie rezerwacje na to stanowisko?'))
        // this.reservationService.deleteReservationsOnDesk(desk);
        return true;
      else false;
    }
    return true;
  }

  //todo
  //>make action$s and endSubs$s acually work
  //>pack components into smaller modules
  //  +make smaller services out of this service and put them into smaller modules
  //    ++make the lists work on observable of the same variable so everything works
  //>learn angular coding style
  //>use bulma framework for css
  //>make a booking table - show all hours on given day (mark unavailable ones) and
  //make user choose start and end of reservation (like nday tickets for peka or
  //flight booking)
}
