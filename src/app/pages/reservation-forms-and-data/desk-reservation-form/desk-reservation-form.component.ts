import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {  FormBuilder, Validators } from '@angular/forms';
import {filter, Subject, switchMap} from 'rxjs';
import { Reservation } from '../reservation';

const action$ = new Subject<Reservation>

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit {
  constructor(
    private service: LocalstorageDeskListService,
    private fb: FormBuilder,
    private validators: Validators
  ) {}
  reservationForm = this.fb.group({
    deskID: [1,Validators.required],
    reservedBy: ['', Validators.pattern('.{1,}')],
    reservationDate: ['', Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')],
  });
  // deskID: FormControl = new FormControl();
  // reservedBy: FormControl = new FormControl();
  // reservationDate: FormControl = new FormControl();

  ngOnInit() {
    action$.pipe(filter(d => {
      return d == this.reservationForm.value
    }),switchMap(d => this.service.reserveDesk(d))).subscribe();
  }
  reserveDesk(): void {
    console.log(this.reservationForm.errors)
    action$.next(this.reservationForm.value as Reservation);
    // this.service.reserveDesk(this.reservationForm.value as Reservation);
  }
}
