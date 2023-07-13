import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeskObj } from './desk-obj';

@Injectable()
export class LocalstorageDeskListService {
  constructor() {}
  private date = new Date();
  // deskListObs: Observable<string> = new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) subscriber.next(value);
  //     else subscriber.next('');
  //   }, 1000);
  // });
  value: any;
  getDeskList(): Observable<DeskObj[]> {
    return new Observable((subscriber) => {
      this.value = localStorage.getItem('deskList');
      if (this.value != null) subscriber.next(JSON.parse(this.value));
      else subscriber.next([]);
    });
  }

  setDeskList(newValue: DeskObj[]): void {
    localStorage.setItem('deskList', JSON.stringify(newValue));
  }

  addDesk(newDeskId: number): void {
    let deskList = localStorage.getItem('deskList');
    let newDeskList: DeskObj[];
    if (deskList != null) {
      newDeskList = JSON.parse(deskList);
      if (newDeskList.find((m: any) => m.deskID == newDeskId)) {
        alert('stanowisko już istnieje');
        return;
      } else {
        newDeskList.push({
          deskID: newDeskId,
          reservedBy: '',
          reservationDate: '',
        });
      }
    } else {
      newDeskList = [
        {
          deskID: newDeskId,
          reservedBy: '',
          reservationDate: '',
        },
      ];
    }
    this.setDeskList(newDeskList);
  }

  reserveDesk(reserveObj: DeskObj): void {
    let currentDate =
      this.date.getFullYear().toString() +
      this.date.getMonth.toString() +
      this.date.getDate().toString();
    if (reserveObj.reservationDate < currentDate) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return;
    }
    let deskList: any = localStorage.getItem('deskList');
    if (deskList != null) {
      deskList = JSON.parse(deskList);

      if (
        deskList.find(
          (m: any) =>
            m.deskID == reserveObj.deskID &&
            m.reservedBy == '' &&
            m.reservationDate == reserveObj.reservationDate
        ) ||
        !deskList.find(
          (m: any) =>
            m.deskID == reserveObj.deskID &&
            m.reservationDate == reserveObj.reservationDate
        )
      ) {
        deskList[reserveObj.deskID - 1].reservedBy = reserveObj.reservedBy;
        localStorage.setItem('deskList', JSON.stringify(deskList));
      } else {
        alert('nie można zarezerwować tego stanowiska');
      }
    }
    //todo
    //funkcja zwracająca obs
    //reaktywny form
    //+ async w tabeli
  }
}
