import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {  FormBuilder } from '@angular/forms';
import {Subject} from 'rxjs';

const action$ = new Subject<any>

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

  ngOnInit() {
    console.log(typeof this.reservationForm);
  }
  reserveDesk(): void {

    // this.service.reserveDesk(this.reservationForm.value as Reservation);
  }
}
