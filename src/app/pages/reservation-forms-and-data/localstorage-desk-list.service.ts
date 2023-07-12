import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocalstorageDeskListService {
  constructor() {}

  // deskListObs: Observable<string | null> = new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) subscriber.next(JSON.parse(value));
  //     else subscriber.next(null);
  //   }, 1000);
  // });

  setDeskList(newValue: object) {
    localStorage.setItem('deskList', JSON.stringify(newValue));
  }
}
