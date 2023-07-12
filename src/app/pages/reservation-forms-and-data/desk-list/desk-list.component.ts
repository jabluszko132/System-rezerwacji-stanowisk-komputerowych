import { Component, NgIterable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  // deskList: Observable<Array<string>> = new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) subscriber.next(JSON.parse(value));
  //     else subscriber.next(['']);
  //   }, 1000);
  // });

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

  updateDeskList: Observable<any> = new Observable((subscriber) => {
    let value: any = null;
    const getDeskList = setInterval(() => {
      value = localStorage.getItem('deskList');
      if (value != null) this.deskList = JSON.parse(value);
      else this.deskList = null;
    }, 100);
  });

  ngOnInit() {
    if (localStorage['deskList'] == null)
      this.service.setDeskList(this.deskList);
    this.updateDeskList.subscribe(() => {});
  }
}
