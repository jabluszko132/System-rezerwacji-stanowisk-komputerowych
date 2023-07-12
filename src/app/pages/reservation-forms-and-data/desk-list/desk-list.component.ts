import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private deskListAccess: LocalstorageDeskListService) {}

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
  }
  logx() {
    this.deskListAccess.deskListObs.subscribe({
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
