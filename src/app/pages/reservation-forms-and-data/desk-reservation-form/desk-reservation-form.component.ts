import { Component, OnInit } from '@angular/core';
import { ReservationDataHandlerService } from '../reservation-data-handler.service';

@Component({
  selector: 'app-desk-reservation-form',
  templateUrl: './desk-reservation-form.component.html',
  styleUrls: ['./desk-reservation-form.component.css'],
})
export class DeskReservationFormComponent implements OnInit {
  constructor(private service: ReservationDataHandlerService) {}

  ngOnInit() {}
}
