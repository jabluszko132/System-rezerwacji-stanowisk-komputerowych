import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { NumberRange } from '../number-range';

@Component({
  selector: 'app-available-reservation-hours-list',
  templateUrl: './available-reservation-hours-list.component.html',
  styleUrls: ['./available-reservation-hours-list.component.css'],
})
export class AvailableReservationHoursListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}
  availableHours: NumberRange[] = [];

  ngOnInit() {}

  getAvailableHours() {
    // this.service.availableReservationHoursOnDay();
  }
}
