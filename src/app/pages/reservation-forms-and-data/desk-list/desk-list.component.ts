import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private service: LocalstorageDeskListService) {}

  // deskList: Observable<Array<string>> = new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) subscriber.next(JSON.parse(value));
  //     else subscriber.next(['']);
  //   }, 1000);
  // });

  // deskList: DeskObj[] = [];
  //   {
  //     deskID: 1,
  //     reservedBy: '',
  //   },
  //   {
  //     deskID: 2,
  //     reservedBy: 'Adam Kowalski',
  //   },
  // ];
  tstobs$: Observable<number[]> = of([1, 2, 3, 4]);
  destr$: Subject<void> = new Subject<void>();
  deskList: Observable<any> = this.service.getDeskList();
  // new Observable((subscriber) => {
  //   let value: any = null;
  //   const getDeskList = setInterval(() => {
  //     value = localStorage.getItem('deskList');
  //     if (value != null) this.deskList = JSON.parse(value);
  //     else this.deskList = [];
  //   }, 300);
  // });
  ngOnDestroy() {
    this.destr$.next();
    this.destr$.complete();
  }
  ngOnInit() {
    this.deskList.subscribe(() => {});
    this.tstobs$.pipe(takeUntil(this.destr$)).subscribe((i) => {});
    // if (localStorage['deskList'] == null)
    //   this.service.setDeskList(this.deskList);
    // this.updateDeskList.subscribe(() => {});
  }
  ngAfterViewInit() {
    this.service.refreshDeskList();
  }
}
