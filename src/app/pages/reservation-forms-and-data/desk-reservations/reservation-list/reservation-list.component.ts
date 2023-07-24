import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LocalstorageDeskListService } from '../../localstorage-desk-list.service';
import { Reservation } from '../../interfaces/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  reservationList$: Observable<any> = this.service.getReservationList();

  ngOnInit() {}

  deleteReservation(reservation: Reservation): void {
    this.service.deleteReservation(reservation);
  }
}
