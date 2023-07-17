import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { Reservation } from './reservation';
import { Desk } from './desk';
const date = new Date();

// const reservationList$: Subject<Reservation[]> = new Subject<
//   Reservation[]
// >();

// const deskList$: Subject<Object[]> = new Subject<Object[]>();

@Injectable()
export class LocalstorageDeskListService {
  constructor() {}
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

  getReservationList(): Observable<Reservation[]> {
    return of(this.reservationList);
  }

  getDeskList(): Observable<Desk[]> {
    return of(this.deskList);
  }

  // refreshReservationList(): void {
  //   this.value = localStorage.getItem('reservationList');
  //   if (this.value != null) reservationList$.next(JSON.parse(this.value));
  //   else reservationList$.next([]);
  // }

  // refreshDeskList(): void {
  //   this.value = localStorage.getItem('deskList');
  //   if (this.value != null) deskList$.next(JSON.parse(this.value));
  //   else deskList$.next([]);
  // }

  // setReservationList(newValue: Reservation[]): void {
  //   localStorage.setItem('reservationList', JSON.stringify(newValue));
  //   reservationList$.next(newValue);
  // }

  addDesk(newDeskId: number): Observable<boolean> {
    let deskListInLS: string | null = localStorage.getItem('deskList');
    if (deskListInLS != null) {
      this.deskList = JSON.parse(deskListInLS);
      if (this.deskList.find((m: any) => m.deskID == newDeskId)) {
        alert('stanowisko już istnieje');
        return of(false);
      } else {
        this.deskList.push({
          deskID: newDeskId,
        });
      }
    } else {
      this.deskList = [
        {
          deskID: newDeskId,
        },
      ];
    }
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
    return of(true);
  }

  reservationList: Reservation[] = [];
  deskList: Desk[] = [];

  private addReservationOnNewDate(reserveObj: Reservation): void {
    this.reservationList.push(reserveObj);
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
  }

  reserveDesk(reserveObj: Reservation): Observable<boolean> {
    if (reserveObj.reservedBy === '') {
      alert('Musi istnieć osoba dokonująca rezerwacji');
      return of(false);
    }
    if (reserveObj.reservationDate < this.currentDateString()) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return of(false);
    }
    let deskListInLS: any = localStorage.getItem('deskList');
    let reservationListInLS: any = localStorage.getItem('reservationList');
    if (deskListInLS != null) {
      deskListInLS = JSON.parse(deskListInLS);
      if (!deskListInLS.find((m: any) => m.deskID == reserveObj.deskID)) {
        alert('Nie ma takiego stanowiska');
        return of(false);
      }
      if (reservationListInLS != null) {
        reservationListInLS = JSON.parse(reservationListInLS);
        // if (
        //   reservationListInLS.find(
        //     (m: any) =>
        //       m.deskID == reserveObj.deskID &&
        //       m.reservedBy == '' &&
        //       m.reservationDate == reserveObj.reservationDate
        //   )
        // ) {
        //   this.reservationList[reserveObj.deskID - 1].reservedBy =
        //     reserveObj.reservedBy; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!napraw to
        //   localStorage.setItem(
        //     'reservationList',
        //     JSON.stringify(this.reservationList)
        //   );
        //   return of(true);}else
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
          alert('nie można zarezerwować tego stanowiska');
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

  deleteDesk(deskId: number): Observable<Boolean> {
    let deskToDeleteIndex: number | null | undefined = this.deskList.indexOf({
      deskID: deskId,
    });
    if (!deskToDeleteIndex) {
      alert('Nie ma takiego stanowiska');
      return of(false);
    }
    if (this.reservationList.find((m: any) => m.deskID == deskId)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
      return of(false);
    }
    this.deskList.splice(deskToDeleteIndex);
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
    return of(true);
  }

  deleteReservation(reservation: Reservation): Observable<Boolean> {
    let reservationToDeleteIndex: number =
      this.reservationList.indexOf(reservation);
    if (!reservationToDeleteIndex) {
      alert('Nie ma takiej rezerwacji');
      return of(false);
    }
    this.reservationList.splice(reservationToDeleteIndex);
    return of(true);
  }

  //todo
  //endings of subscriptions in reasonable moments in every script that uses obeservables
}
