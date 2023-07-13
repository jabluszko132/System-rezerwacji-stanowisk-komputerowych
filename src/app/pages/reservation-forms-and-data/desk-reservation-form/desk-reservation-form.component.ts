import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  deskID: FormControl = new FormControl();
  reservedBy: FormControl = new FormControl();
  reservationDate: FormControl = new FormControl();

  ngOnInit() {}
  reserveDesk(): void {
    this.service.reserveDesk({
      deskID: this.deskID.value,
      reservedBy: this.reservedBy.value,
      reservationDate: this.reservationDate.value,
    });
  }
}
