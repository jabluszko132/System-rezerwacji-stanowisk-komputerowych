import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  setDeskList(newValue: object) {
    localStorage.setItem('deskList', JSON.stringify(newValue));
  }
}
