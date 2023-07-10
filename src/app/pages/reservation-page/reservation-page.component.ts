import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent implements OnInit {
  constructor(route: ActivatedRoute) {
    const id: Observable<string> = route.params.pipe(map((p) => p.id));
    const url: Observable<string> = route.url.pipe(
      map((segments) => segments.join(''))
    );
    // route.data includes both `data` and `resolve`
    const user = route.data.pipe(map((d) => d.user));
  }

  ngOnInit() {}
}
