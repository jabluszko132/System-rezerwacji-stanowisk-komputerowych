import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit, AfterViewInit {
  constructor(private service: LocalstorageDeskListService) {}
  reservationList: Observable<any> = this.service.getReservationList();

  ngAfterViewInit() {
    // this.service.refreshReservationList();
  }
  ngOnInit() {
    this.reservationList.subscribe(() => {});
    // this.service.refreshReservationList();
  }
}