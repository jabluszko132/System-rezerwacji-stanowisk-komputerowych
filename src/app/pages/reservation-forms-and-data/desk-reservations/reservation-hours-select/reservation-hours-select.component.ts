import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeskReservationsLsService } from '../desk-reservations-ls.service';
import { filter, Subject, switchMap, takeUntil, of } from 'rxjs';
import {NumberRange} from '../../interfaces/number-range';


@Component({
  selector: 'app-reservation-hours-select',
  templateUrl: './reservation-hours-select.component.html',
  styleUrls: ['./reservation-hours-select.component.css'],
})
export class ReservationHoursSelectComponent implements OnInit, OnDestroy {
  constructor(
    private service: DeskReservationsLsService,
    private fb: FormBuilder
  ) {}

  workHours: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

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

  ngOnInit() {
    this.checkIfReservedHour(2);
    this.action$.pipe(filter((m:any)=>m == this.form.value),switchMap((d:any)=>
      this.availableHours = this.service.availableReservationHoursOnDay(d.deskID,d.reservationDate)
    ),takeUntil(this.endSubs$)).subscribe();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  
  getAvailableHours(): void {
    console.log(this.deskID.errors)
    console.log(this.reservationDate.errors)
    if(this.deskID.errors || this.reservationDate.errors) return;
    this.action$.next(this.form.value);
    console.log(this.availableHours)
    this.displayList = true;
  }

  checkIfReservedHour(hour:number) :boolean {
    //special case - hour isnt in range <x.from,x.to) but still can be available
    if(hour == this.workHours[this.workHours.length-1]) {  
      if(this.availableHours[this.availableHours.length-1].to == hour) return false;
      else return true;
    }
    for(let x of this.availableHours) {
      if(hour >= x.from && hour < x.to) return false;
    }
    return true;
  }
}