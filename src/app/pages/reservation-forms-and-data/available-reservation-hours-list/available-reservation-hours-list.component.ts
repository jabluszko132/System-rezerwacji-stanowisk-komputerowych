import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { filter, Subject, switchMap, takeUntil, of } from 'rxjs';
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
  displayList = false;

  form = this.fb.nonNullable.group({
    deskID: [1, [Validators.required]],
    reservationDate: ['',[Validators.required]],
  })

  deskID: FormControl<number> = this.form.controls.deskID;
  reservationDate: FormControl<string> = this.form.controls.reservationDate;

  ngOnInit() {
    action$.pipe(filter((m:any)=>m == this.form.value),switchMap((d:any)=>{
      this.availableHours = this.service.availableReservationHoursOnDay(d.deskID,d.reservationDate);
      return of(null);
      }),takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }
  
  getAvailableHours(): void {
    action$.next(this.form.value);
    console.log(this.availableHours);
    this.displayList = true;
  }
}
