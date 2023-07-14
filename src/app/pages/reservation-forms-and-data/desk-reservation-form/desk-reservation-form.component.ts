import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReservationObj } from '../reservation-obj';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit {
  constructor(
    private service: LocalstorageDeskListService,
    private fb: FormBuilder
  ) {}
  reservationForm = this.fb.nonNullable.group({
    deskID: 1,
    reservedBy: '',
    reservationDate: '',
  });

  // deskID: FormControl = new FormControl();
  // reservedBy: FormControl = new FormControl();
  // reservationDate: FormControl = new FormControl();

  ngOnInit() {}
  reserveDesk(): void {
    this.service.reserveDesk(this.reservationForm.value as ReservationObj);
  }
}
