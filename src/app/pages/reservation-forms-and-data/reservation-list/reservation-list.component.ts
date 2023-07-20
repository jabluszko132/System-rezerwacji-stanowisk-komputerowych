import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { Reservation } from '../reservation';


const endSubs$: Subject<null> = new Subject<null>;

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  constructor(private service: LocalstorageDeskListService) {}
  reservationList$: Observable<any> = this.service.getReservationList();

  ngOnInit() {
    this.reservationList$.pipe(takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }

  deleteReservation(reservation: Reservation): void {
    this.service.deleteReservation(reservation);
  }
}
