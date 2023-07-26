import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeskReservationsLsService } from '../desk-reservations-ls.service';
import { filter, Subject, switchMap, takeUntil, of } from 'rxjs';
import {NumberRange} from '../../interfaces/number-range';
import { LocalstorageDeskListService } from '../../localstorage-desk-list.service';
import { Reservation } from '../../interfaces/reservation';


@Component({
  selector: 'app-reservation-hours-select',
  templateUrl: './reservation-hours-select.component.html',
  styleUrls: ['./reservation-hours-select.component.css'],
})
export class ReservationHoursSelectComponent implements OnInit, OnDestroy {
  constructor(
    private service: DeskReservationsLsService,
    private lsDeskListService: LocalstorageDeskListService,
    private fb: FormBuilder
  ) {}

  workHours: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  private action$: Subject<any> = new Subject<any>;
  private submitReservation$: Subject<Reservation> = new Subject<Reservation>;
  private endSubs$: Subject<void> = new Subject<void>;

  availableHours: NumberRange[] = [];
  displayList = false;


  /**
   * Object holding range of hours to reserve
   * 
   * Value equal -1 means that no hour is selected for that value
   */
  reservationHours: NumberRange = {
    from: -1,
    to: -1,
  }


  form = this.fb.nonNullable.group({
    deskID: [1,Validators.required],
    reservedBy: ['', Validators.required],
    reservationDate: ['', [Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'),Validators.required]],
  })

  deskID: FormControl<number> = this.form.controls.deskID;
  reservedBy: FormControl<string> = this.form.controls.reservedBy;
  reservationDate: FormControl<string> = this.form.controls.reservationDate;

  ngOnInit() {
    this.checkIfReservedHour(2);
    this.action$.pipe(filter((m:any)=>m == this.form.value),switchMap((d:any)=>
      this.availableHours = this.service.availableReservationHoursOnDay(d.deskID,d.reservationDate)
    ),takeUntil(this.endSubs$)).subscribe();
    
    this.submitReservation$.pipe(switchMap((d:Reservation)=>this.service.reserveDesk(d)
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
    if(this.availableHours.length == 0) return true;
    //v special case - hour isnt in range <x.from,x.to) but still can be available
    if(hour == this.workHours[this.workHours.length-1]) {  
      if(this.availableHours[this.availableHours.length-1].to == hour) return false;
      else return true;
    }
    for(let x of this.availableHours) {
      if(hour >= x.from && hour < x.to) return false;
    }
    return true;
  }

  selectHour(h: number): void {
    if(this.checkIfReservedHour(h)) return;
    if(this.reservationHours.from == -1) {
      this.reservationHours.from = h; 
      return;
    }
    if(this.reservationHours.to == -1) {
      if(this.reservationHours.from > h) {
        this.reservationHours.from = h;
        this.reservationHours.to = -1;
      }else {
        for(let i = this.reservationHours.from; i <= h; i++) {
          if(this.checkIfReservedHour(i)) { //optimise this later
            alert('Podany przedział zawiera zarezerwowane godziny');
            this.reservationHours.from = -1;
            this.reservationHours.to = -1;
            return;
          } 
        }
        this.reservationHours.to = h;
      }
    }else {
      this.reservationHours.to = -1;
      this.reservationHours.from = h;
    }
  }

  reserve() {
    if(this.deskID.errors || this.reservationDate.errors || this.deskID.errors ) {
      alert('Proszę wprowadzić poprawne wartości we wszystkie pola formularza');
      return;
    }
    if(this.reservationHours.from == -1 || this.reservationHours.to == -1) {
      alert('Proszę zaznaczyć poprawne godziny rezerwacji')
      return;
    }
    for(let i = this.reservationHours.from; i <= this.reservationHours.to; i++) {
      if(this.checkIfReservedHour(i)) return; //optimise this later
    }
    this.submitReservation$.next({
      deskID: this.deskID.value,
      reservedBy: this.reservedBy.value,
      reservationDate: this.reservationDate.value,
      startHour: this.reservationHours.from,
      endHour: this.reservationHours.to,
    })
    this.reservationHours.from = -1;
    this.reservationHours.to = -1;
    this.displayList = false;
  }
}
