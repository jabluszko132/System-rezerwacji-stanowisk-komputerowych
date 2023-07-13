import { Component, OnInit } from '@angular/core';
import { DeskObj } from '../desk-obj';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})

//TODO HERE
//
//change deskList into an observable (do it in other components to) so they dinamically refresh themselves
//
//
//
//
//
//
export class DeskReservationFormComponent implements OnInit {
  constructor() {}
  reserveObj: DeskObj = {
    deskID: 1,
    reservedBy: '',
    reservationDate: '',
    reservationEnd: '',
  };
  deskList: any = [];
  ngOnInit() {}
  reserveDesk() {
    this.deskList = localStorage.getItem('deskList');
    if (this.deskList != null) this.deskList = JSON.parse(this.deskList);
    if (
      this.deskList.find(
        (m: any) => m.deskID == this.reserveObj.deskID && m.reservedBy == ''
      )
    ) {
      this.deskList[this.reserveObj.deskID - 1].reservedBy =
        this.reserveObj.reservedBy;
      localStorage.setItem('deskList', JSON.stringify(this.deskList));
    } else {
      alert('nie można zarezerwować tego stanowiska');
    }
  }
}
