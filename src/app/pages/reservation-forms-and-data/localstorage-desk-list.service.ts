import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from './interfaces/reservation';
import { Desk } from './interfaces/desk';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const date = new Date();

@Injectable()
export class LocalstorageDeskListService {
  constructor() {
    this.reservationList$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.pushReservationListToLS());
    this.deskList$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.pushDeskListToLS());
  }

  private reservationList$: BehaviorSubject<Reservation[]> =
    new BehaviorSubject<Reservation[]>(this.lsGetReservationList());

  private reservationList: Reservation[] = this.reservationList$.getValue();

  private deskList$: BehaviorSubject<Desk[]> = new BehaviorSubject<Desk[]>(
    this.lsGetDeskList()
  );

  private deskList: Desk[] = this.deskList$.getValue();

  private lsGetDeskList(): Desk[] {
    let value = localStorage.getItem('deskList');
    return value ? JSON.parse(value) : [];
  }
  private lsGetReservationList(): Reservation[] {
    let value = localStorage.getItem('reservationList');
    return value ? JSON.parse(value) : [];
  }

  getReservationList(): BehaviorSubject<Reservation[]> {
    return this.reservationList$;
  }
  getDeskList(): BehaviorSubject<Desk[]> {
    return this.deskList$;
  }

  /**
   * Forces this instance's local deskList value to change to the one in localStorage
   *
   */
  private forceDeskListRefresh(): void {
    this.deskList = this.deskList$.getValue();
  }

  /**
   * Forces this instance's local reservationList value to change to the one in localStorage
   */
  private forceReservationListRefresh(): void {
    this.reservationList = this.reservationList$.getValue();
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
  }
  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushDeskListToLS(): void {
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
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
    } catch (e) {
      console.error(e);
    }
  }

  deleteReservationsOnDesk(desk: Desk): void {
    let reservationIndex: number = this.reservationList.findIndex(
      (m: any) => m.deskID == desk.deskID
      // console.log(m.deskID);
      // console.log(desk.deskID);
      //^I love it when the only thing that
      //you change in your code is adding
      //some logs and immediately deleting them and it somehow fixes
      //everything
    );
    while (reservationIndex != -1) {
      this.unsafeDeleteReservation(this.reservationList[reservationIndex]);
      reservationIndex = this.reservationList.findIndex((m: any) => {
        m.deskID == desk.deskID;
      });
    }
    this.reservationList$.next(this.reservationList);
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
        this.deleteReservationsOnDesk(desk);
      else false;
    }
    return true;
  }

  //todo
  //>learn angular coding style
  //>make a booking table - show all hours on given day (mark unavailable ones) and
  //make user choose start and end of reservation (like nday tickets for peka or
  //flight booking)
  // +make that table use observable so if there is another reservation on given
  // desk it changes too
  //>figure out when and where to complete() the subjects deskList$ and reservationList$
  //>think of a better name for this service and apply it
  //>move unnesessary things from constructors to ngOnInits

  //questions
  //>how to use action$ to handle 2 events
  //>what should happen when user selects hours between which are any reserved hours
}
