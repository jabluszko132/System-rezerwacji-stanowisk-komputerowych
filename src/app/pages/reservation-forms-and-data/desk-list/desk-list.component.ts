import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Desk } from '../interfaces/desk';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  deskList$: Observable<any> = this.service.getDeskList();

  ngOnInit() {
    this.deskList$.subscribe();
  }

  deleteDesk(desk: Desk): void {
    this.service.deleteDesk(desk);
  }
}
