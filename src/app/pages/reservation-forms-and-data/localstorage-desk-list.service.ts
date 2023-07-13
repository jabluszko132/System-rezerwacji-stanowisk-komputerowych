import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReservationObj } from './reservation-obj';
const date = new Date();

const reservationList$: Subject<ReservationObj[]> = new Subject<
  ReservationObj[]
>();
const deskList$: Subject<Object[]> = new Subject<Object[]>();

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

  getReservationList(): Subject<ReservationObj[]> {
    return reservationList$;
  }

  getDeskList(): Subject<Object[]> {
    return deskList$;
  }

  refreshReservationList(): void {
    this.value = localStorage.getItem('reservationList');
    if (this.value != null) reservationList$.next(JSON.parse(this.value));
    else reservationList$.next([]);
  }

  refreshDeskList(): void {
    this.value = localStorage.getItem('deskList');
    if (this.value != null) deskList$.next(JSON.parse(this.value));
    else deskList$.next([]);
  }

  setReservationList(newValue: ReservationObj[]): void {
    localStorage.setItem('reservationList', JSON.stringify(newValue));
    reservationList$.next(newValue);
  }

  addDesk(newDeskId: number): void {
    let deskList: string | null = localStorage.getItem('deskList');
    let newDeskList: any[] = [];
    if (deskList != null) {
      newDeskList = JSON.parse(deskList);
      if (newDeskList.find((m: any) => m.deskID == newDeskId)) {
        alert('stanowisko już istnieje');
        return;
      } else {
        newDeskList.push({
          deskID: newDeskId,
        });
      }
    } else {
      newDeskList = [
        {
          deskID: newDeskId,
        },
      ];
    }
    localStorage.setItem('deskList', JSON.stringify(newDeskList));
    deskList$.next(newDeskList);
  }

  reservationList: any;
  addReservationOnNewDate(reserveObj: ReservationObj): void {
    this.reservationList.push(reserveObj);
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
    reservationList$.next(this.reservationList);
  }

  reserveDesk(reserveObj: ReservationObj): void {
    if (reserveObj.reservationDate < this.currentDateString()) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return;
    }
    let deskList: any = localStorage.getItem('deskList');
    this.reservationList = localStorage.getItem('reservationList');
    if (deskList != null) {
      deskList = JSON.parse(deskList);
      if (!deskList.find((m: any) => m.deskID == reserveObj.deskID)) {
        alert('Nie ma takiego stanowiska');
        return;
      }
      if (this.reservationList != null) {
        this.reservationList = JSON.parse(this.reservationList);
        if (
          this.reservationList.find(
            (m: any) =>
              m.deskID == reserveObj.deskID &&
              m.reservedBy == '' &&
              m.reservationDate == reserveObj.reservationDate
          )
        ) {
          this.reservationList[reserveObj.deskID - 1].reservedBy =
            reserveObj.reservedBy;
          localStorage.setItem(
            'reservationList',
            JSON.stringify(this.reservationList)
          );
          reservationList$.next(this.reservationList);
        } else if (
          !this.reservationList.find(
            (m: any) =>
              m.deskID == reserveObj.deskID &&
              m.reservationDate == reserveObj.reservationDate
          )
        ) {
          this.addReservationOnNewDate(reserveObj);
        } else {
          alert('nie można zarezerwować tego stanowiska');
        }
      } else {
        this.reservationList = [];
        this.addReservationOnNewDate(reserveObj);
        return;
      }
    } else {
      alert(
        'Lista stanowisk jest pusta. Dodaj stanowisko aby móc je zarezerwować'
      );
    }

    //todo
    //reactive forms
    //onDestroy -> unsubscribe/.complete() in every script that uses obesrvables
  }
}
