import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {  FormBuilder, Validators } from '@angular/forms';
import {filter, Subject, switchMap, takeUntil} from 'rxjs';
import { Reservation } from '../reservation';

const action$: Subject<any> = new Subject<any>;
const endSubs$: Subject<null> = new Subject<null>;

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit, OnDestroy {
  constructor(
    private service: LocalstorageDeskListService,
    private fb: FormBuilder,
  ) {}

  // deskList$ :Observable<any> = this.service.getDeskList();
  reservationForm = this.fb.group({
    deskID: [1,Validators.required],
    reservedBy: ['', Validators.required],
    reservationDate: ['', [Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'),Validators.required]],
  });

  deskID = this.reservationForm.controls.deskID;
  reservedBy = this.reservationForm.controls.reservedBy;
  reservationDate = this.reservationForm.controls.reservationDate;


  ngOnInit() {
    // this.deskList$.subscribe();
    action$.pipe(filter(d => {
      return d == this.reservationForm.value
    }),switchMap(d => this.service.reserveDesk(d)),takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }

  reserveDesk(): void {
    console.log(this.deskID.value)
    if(this.deskID.errors || this.reservedBy.errors || this.reservationDate.errors)
    {
      alert('Podaj poprawne wartości we wszystkich polach formularza')
      return;
    }else action$.next(this.reservationForm.value as Reservation);
  }
}