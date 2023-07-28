import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReservatorService } from '../reservator.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import {NumberRange} from '../../interfaces/number-range';
import { Reservation } from '../../interfaces/reservation';


@Component({
  selector: 'app-reservation-hours-select',
  templateUrl: './reservation-hours-select.component.html',
  styleUrls: ['./reservation-hours-select.component.css'],
})
export class ReservationHoursSelectComponent implements OnInit, OnDestroy {
  constructor(
    private service: ReservatorService,
    private fb: FormBuilder
  ) {}

  //------------------- Public properties ------------------------------
  availableHours: NumberRange[] = [];
  displayList = false;


  form = this.fb.nonNullable.group({
    deskID: [1,Validators.required],
    reservedBy: ['', Validators.required],
    reservationDate: ['', [Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'),Validators.required]],
  })

  deskID: FormControl<number> = this.form.controls.deskID;
  reservationDate: FormControl<string> = this.form.controls.reservationDate;
  reservedBy: FormControl<string> = this.form.controls.reservedBy;

  /**
   * Object holding range of hours to reserve
   * 
   * Value equal -1 means that no hour is selected for that value
   */
   reservationHours: NumberRange = {
    from: -1,
    to: -1,
  }

  /** 
   * List of hours during which people work in the office
   * Includes the whole hour 
   * Eg. if the list ends with 17 it means the office works until 17:59
   * 
   * It is made so in order to simplify reserving hours
   */
  workHours: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; 

  //--------------------- Private properties ----------------------------------

  private action$: Subject<any> = new Subject<any>;
  private endSubs$: Subject<void> = new Subject<void>;
  private submitReservation$: Subject<Reservation> = new Subject<Reservation>;

 //----------------------- Public methods ------------------------------------
  checkIfReservedHour(hour:number) :boolean {
    if(this.availableHours.length == 0) return true;
    //v special case - hour isnt in range <x.from,x.to) but still can be available
    if(hour == this.workHours[this.workHours.length-1]) {  
      if(this.availableHours[this.availableHours.length-1].to == hour + 1) return false;
      else return true;
    }
    for(let x of this.availableHours) {
      if(hour >= x.from && hour < x.to) return false;
    }
    return true;
  }

  clearSelectedHours(): void {
    this.reservationHours = {from: -1, to: -1};
  }

  getAvailableHours(): void {
    if(this.deskID.errors || this.reservationDate.errors) return;
    this.action$.next(this.form.value);
    this.displayList = true;
  }

  ngOnInit() {
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
  
  reserve(): void {
    if(this.deskID.errors || this.reservationDate.errors || this.deskID.errors ) {
      alert('Proszę wprowadzić poprawne wartości we wszystkie pola formularza');
      return;
    }
    if(this.reservationHours.from == -1 || this.reservationHours.to == -1) {
      alert('Proszę zaznaczyć poprawne godziny rezerwacji')
      return;
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
    this.getAvailableHours()
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
        this.reservationHours.to = h+1;
      }
    }else {
      this.reservationHours.to = -1;
      this.reservationHours.from = h;
    }
    console.log(this.reservationHours);
  }
}
