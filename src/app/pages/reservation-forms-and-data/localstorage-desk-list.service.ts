import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationObj } from './reservation-obj';
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
  // deskListObs: Observable<string> = new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) subscriber.next(value);
  //     else subscriber.next('');
  //   }, 1000);
  // });
  value: any;
  getReservationList(): Observable<ReservationObj[]> {
    return new Observable((subscriber) => {
      this.value = localStorage.getItem('reservationList');
      if (this.value != null) subscriber.next(JSON.parse(this.value));
      else subscriber.next([]);
    });
  }

  getDeskList(): Observable<Object[]> {
    return new Observable((subscriber) => {
      this.value = localStorage.getItem('deskList');
      if (this.value != null) subscriber.next(JSON.parse(this.value));
      else subscriber.next([]);
    });
  }

  setReservationList(newValue: ReservationObj[]): void {
    localStorage.setItem('reservationList', JSON.stringify(newValue));
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
    //       reservedBy: '',
    //       reservationDate: '',
    //     });
    //   }
    // } else {
    //   newDeskList = [
    //     {
    //       deskID: newDeskId,
    //       reservedBy: '',
    //       reservationDate: '',
    //     },
    //   ];
    // }
    console.log(newDeskList);
    localStorage.setItem('deskList', JSON.stringify(newDeskList));
  }

  reserveDesk(reserveObj: ReservationObj): void {
    if (reserveObj.reservationDate > this.currentDateString()) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return;
    }
    let deskList: any = localStorage.getItem('deskList');
    let reservationList: any = localStorage.getItem('reservationList');
    if (deskList != null) {
      deskList = JSON.parse(deskList);
      if (!deskList.find((m: any) => m.deskID == reserveObj.deskID)) {
        alert('Nie ma takiego stanowiska');
        return;
      }
      if (reservationList != null) JSON.parse(reservationList);
      else reservationList = [];
      reservationList as Object[];
      console.log(typeof reservationList);
      console.log(reservationList);
      if (
        reservationList.find(
          (m: any) =>
            m.deskID == reserveObj.deskID &&
            m.reservedBy == '' &&
            m.reservationDate == reserveObj.reservationDate
        ) //||
        // !deskList.find(
        //   (m: any) =>
        //     m.deskID == reserveObj.deskID &&
        //     m.reservationDate == reserveObj.reservationDate
        // )
      ) {
        reservationList[reserveObj.deskID - 1].reservedBy =
          reserveObj.reservedBy;
        localStorage.setItem(
          'reservationList',
          JSON.stringify(reservationList)
        );
      } else if (
        !reservationList.find(
          (m: any) =>
            m.deskID == reserveObj.deskID &&
            m.reservationDate == reserveObj.reservationDate
        )
      ) {
        reservationList.push(reserveObj);
        localStorage.setItem(
          'reservationList',
          JSON.stringify(reservationList)
        );
      } else {
        alert('nie można zarezerwować tego stanowiska');
      }
    } else {
      alert(
        'Lista stanowisk jest pusta. Dodaj stanowisko aby móc je zarezerwować'
      );
    }

    //todo
    //reaktywny form
    //napraw sprawdzanie daty w reserveDesk
  }
}
