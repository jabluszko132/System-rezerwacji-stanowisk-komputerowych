import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const deskList = new Observable(function subsribe(subscriber) {
  let value: any = null;
  while (true) {
    setTimeout(() => {
      value = localStorage.getItem('deskList');
      subscriber.next(value == null ? null : JSON.parse(value));
    },1000);
  }
});

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor() {}
  x: any = deskList.subscribe();
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
    while (true) {
      console.log(this.x);
    }
  }
}
