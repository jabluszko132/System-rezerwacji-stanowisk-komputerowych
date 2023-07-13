import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReservationObj } from '../reservation-obj';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})


export class DeskReservationFormComponent implements OnInit, AfterViewInit {
  constructor(private service: LocalstorageDeskListService) {}
  date = new Date();
  reserveObj: ReservationObj = {
    deskID: 1,
    reservedBy: '',
    reservationDate: '',
  };
  ngOnInit() {
    console.log(this.date.getDate());
  }
  reserveDesk(): void {
    this.service.reserveDesk(this.reserveObj);
  }
  ngAfterViewInit() {
    this.service.refreshReservationList();
  }
}
