import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  reservationList: Observable<any> = this.service.getReservationList();

  ngOnInit() {
    this.reservationList.subscribe();
  }

  deleteReservation(reservation: Reservation): void {
    this.service.deleteReservation(reservation);
  }
}
