import { Component, OnInit } from '@angular/core';
import { DeskReservationsLsService } from '../desk-reservations-ls.service';

@Component({
  selector: 'app-reservation-hours-select',
  templateUrl: './reservation-hours-select.component.html',
  styleUrls: ['./reservation-hours-select.component.css'],
})
export class ReservationHoursSelectComponent implements OnInit {
  constructor(private service: DeskReservationsLsService) {}

  workHours: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  ngOnInit() {}
}
