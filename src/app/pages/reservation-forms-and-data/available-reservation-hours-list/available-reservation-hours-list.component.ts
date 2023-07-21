import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { NumberRange } from '../number-range';

const action$: Subject<any> = new Subject<any>
const endSubs$: Subject<null> = new Subject<null>;

@Component({
  selector: 'app-available-reservation-hours-list',
  templateUrl: './available-reservation-hours-list.component.html',
  styleUrls: ['./available-reservation-hours-list.component.css'],
})
export class AvailableReservationHoursListComponent implements OnInit, OnDestroy {
  constructor(private service: LocalstorageDeskListService, private fb: FormBuilder) {}
  availableHours: NumberRange[] = [];

  form = this.fb.nonNullable.group({
    deskID: ['', [Validators.required]],
    reservationDate: ['',[Validators.required]],
  })

  deskID = this.form.controls.deskID;
  reservationDate = this.form.controls.reservationDate;

  ngOnInit() {
    action$.pipe(filter((m:any)=>m == this.form.value),switchMap((d:any)=>this.service.availableReservationHoursOnDay(d.deskID,d.reservationDate)),takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }
  
  getAvailableHours(): void {
    action$.next(this.form.value);
  }
}
