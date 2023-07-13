import { Component, OnInit } from '@angular/core';
import { ReservationObj } from '../reservation-obj';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  reserveObj: ReservationObj = {
    deskID: 1,
    reservedBy: '',
    reservationDate: '',
  };
  ngOnInit() {}
  reserveDesk(): void {
    this.service.reserveDesk(this.reserveObj);
  }
}
