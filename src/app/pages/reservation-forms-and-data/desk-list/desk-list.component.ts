import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor() {}
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
  testList = [1, 2, 3, 4];
  ngOnInit() {
    if (localStorage['deskList'] == null)
      localStorage.setItem('deskList', JSON.stringify(this.deskList));
    else this.deskList = JSON.parse(localStorage['deskList']);
  }
}
