import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const DdeskList = new Observable(function subsribe(subscriber) {
  let value: any = null;
  console.log('trying');
  setTimeout(() => {
    value = localStorage.getItem('deskList');
    subscriber.next(JSON.parse(value));
  }, 1000);
});

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor() {}

  deskListObs: Observable<string | null> = new Observable((subscriber) => {
    let value: any = null;
    const getDeskList = setInterval(() => {
      value = localStorage.getItem('deskList');
      if (value != null) this.deskList = JSON.parse(value);
      else this.deskList = null;
    }, 1000);
  });

  deskList: any = [
    {
      deskID: 1,
      reservedBy: '',
    },
    {
      deskID: 2,
      reservedBy: 'Adam Kowalski',
    },
  ];

  ngOnInit() {
    if (localStorage['deskList'] == null)
      localStorage.setItem('deskList', JSON.stringify(this.deskList));
    else this.deskList = JSON.parse(localStorage['deskList']);
    this.deskListObs.subscribe({});
  }
  logx() {
    DdeskList.subscribe({
      next(x) {
        console.log(x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }
}
