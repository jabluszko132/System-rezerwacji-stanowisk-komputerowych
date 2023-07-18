import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from './reservation';
import { Desk } from './desk';
const date = new Date();

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
  reservationList: Reservation[] = [];
  deskList: Desk[] = [];

  getReservationList(): Observable<Reservation[]> {
    this.value = localStorage.getItem('reservationList');
    this.reservationList = this.value ? JSON.parse(this.value) : [];
    return of(this.reservationList);
  }

  getDeskList(): Observable<Desk[]> {
    this.value = localStorage.getItem('deskList');
    this.deskList = this.value ? JSON.parse(this.value) : [];
    return of(this.deskList);
  }

  private pushDeskListToLS(): void {
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
  }

  private pushReservationListToLS(): void {
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
  }

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
    this.pushDeskListToLS();
    console.log(this.deskList);
    return of(true);
  }

  private addReservationOnNewDate(reserveObj: Reservation): void {
    this.reservationList.push(reserveObj);
    this.pushReservationListToLS();
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

  deleteDesk(desk: Desk): Observable<Boolean> {
    console.log(this.deskList);
    let deskToDeleteIndex: number = this.deskList.indexOf(desk);
    if (deskToDeleteIndex == -1) {
      alert('Nie ma takiego stanowiska');
      return of(false);
    }
    if (this.reservationList.find((m: any) => m.deskID == desk.deskID)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
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

  //todo
  //endings of subscriptions in reasonable moments in every script that uses obeservables
}
