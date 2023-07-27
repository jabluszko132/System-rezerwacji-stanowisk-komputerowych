import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../interfaces/reservation';
import { ReservatorService } from '../reservator.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  constructor(private service: ReservatorService) {}
  reservationList$: Observable<any> = this.service.getReservationList();

  ngOnInit() {}

  deleteReservation(reservation: Reservation): void {
    this.service.deleteReservation(reservation);
  }
}
