import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Desk } from '../desk';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';


const endSubs$: Subject<null> = new Subject<null>;


@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit, OnDestroy {
  constructor(private service: LocalstorageDeskListService) {}

  deskList$: Observable<any> = this.service.getDeskList();

  ngOnInit() {
    this.deskList$.pipe(takeUntil(endSubs$)).subscribe();
  }

  ngOnDestroy() {
    endSubs$.complete();
  }

  deleteDesk(desk: Desk): void {
    this.service.deleteDesk(desk);
  }
}
