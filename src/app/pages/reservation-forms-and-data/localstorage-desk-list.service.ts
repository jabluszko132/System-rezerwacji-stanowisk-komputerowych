import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeskObj } from './desk-obj';

@Injectable()
export class LocalstorageDeskListService {
  constructor() {}

  deskListObs: Observable<string> = new Observable((subscriber) => {
    let value: any = null;
    const getDeskList = setInterval(() => {
      value = localStorage.getItem('deskList');
      if (value != null) subscriber.next(value);
      else subscriber.next('');
    }, 1000);
  });

  setDeskList(newValue: DeskObj[]) {
    localStorage.setItem('deskList', JSON.stringify(newValue));
  }

  addDesk(newDeskId: number) {
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
          reservationEnd: '',
        });
      }
    } else {
      newDeskList = [
        {
          deskID: newDeskId,
          reservedBy: '',
          reservationDate: '',
          reservationEnd: '',
        },
      ];
    }
    this.setDeskList(newDeskList);
  }
}
