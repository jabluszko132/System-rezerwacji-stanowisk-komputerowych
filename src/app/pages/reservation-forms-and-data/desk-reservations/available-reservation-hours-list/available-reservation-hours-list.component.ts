import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { NumberRange } from '../../interfaces/number-range';
import { ReservatorService } from '../reservator.service';


@Component({
  selector: 'app-available-reservation-hours-list',
  templateUrl: './available-reservation-hours-list.component.html',
  styleUrls: ['./available-reservation-hours-list.component.css'],
})
export class AvailableReservationHoursListComponent implements OnInit, OnDestroy {
  constructor(private service: ReservatorService, private fb: FormBuilder) {}

  private action$: Subject<any> = new Subject<any>
  private endSubs$: Subject<void> = new Subject<void>;

  availableHours: NumberRange[] = [];
  displayList = false;

  form = this.fb.nonNullable.group({
    deskID: [1, [Validators.required]],
    reservationDate: ['',[Validators.required]],
  })

  deskID: FormControl<number> = this.form.controls.deskID;
  reservationDate: FormControl<string> = this.form.controls.reservationDate;

  getAvailableHours(): void {
    if(this.deskID.errors || this.reservationDate.errors) return;
    this.action$.next(this.form.value);
    console.log(this.availableHours);
    this.displayList = true;
  }

  ngOnInit() {
    this.action$.pipe(filter((m:any)=>m == this.form.value),switchMap((d:any)=>
      this.availableHours = this.service.availableReservationHoursOnDay(d.deskID,d.reservationDate)
    ),takeUntil(this.endSubs$)).subscribe();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  
}
