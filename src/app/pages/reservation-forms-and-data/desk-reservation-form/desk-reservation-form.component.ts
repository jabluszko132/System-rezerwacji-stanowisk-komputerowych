import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {  FormBuilder, Validators } from '@angular/forms';
import {filter, Subject, switchMap, takeUntil} from 'rxjs';
import { Reservation } from '../reservation';
// import { WorkHoursValidatorDirective } from '../work-hours-validator.directive';

const action$: Subject<any> = new Subject<any>;
const endSubs$: Subject<null> = new Subject<null>;
// const hoursValidator = new WorkHoursValidatorDirective;

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
  reservationForm = this.fb.nonNullable.group({
    deskID: [1,Validators.required],
    reservedBy: ['', Validators.required],
    reservationDate: ['', [Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'),Validators.required]],
    startHour: ['',[Validators.required,]],
    endHour: ['',[Validators.required]]
  });

  deskID = this.reservationForm.controls.deskID;
  reservedBy = this.reservationForm.controls.reservedBy;
  reservationDate = this.reservationForm.controls.reservationDate;
  startHour  = this.reservationForm.controls.startHour;
  endHour = this.reservationForm.controls.endHour;

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
    if(this.deskID.errors || this.reservedBy.errors || this.reservationDate.errors)
    {
      alert('Podaj poprawne wartości we wszystkich polach formularza')
      return;
    }
    if(this.startHour.value as string >= (this.endHour.value as string)) {
      alert('Godzina początkowa nie może być późniejsza niż, ani równa końcowej');
      return;
    }
    if(this.startHour.value as string < '06:00:00' || this.startHour.value as string > '20:00:00' || this.endHour.value as string < '06:00:00' || this.endHour.value as string > '20:00:00') {
      alert('Rezerwacja musi mieścić się w godzinach pracy (6 - 20)');
      return;
    } 
    if(parseInt(this.endHour.value[0] as string + this.endHour.value[1] as string) - parseInt(this.startHour.value[0] as string + this.startHour.value[1] as string) < 1) {
      alert('Minimalna długość rezerwacji to 1 godzina');
      return;
    }
    action$.next(this.reservationForm.value as Reservation);
  }
}