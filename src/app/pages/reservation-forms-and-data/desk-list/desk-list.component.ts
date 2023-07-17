import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit, AfterViewInit {
  constructor(private service: LocalstorageDeskListService) {}

  // tstobs$: Observable<number[]> = of([1, 2, 3, 4]);
  // destr$: Subject<void> = new Subject<void>();
  deskList: Observable<any> = this.service.getDeskList();

  // ngOnDestroy() {
  //   this.destr$.next();
  //   this.destr$.complete();
  // }
  ngOnInit() {
    this.deskList.subscribe(() => {});
    // this.tstobs$.pipe(takeUntil(this.destr$)).subscribe((i) => {});
  }
  ngAfterViewInit() {
    // this.service.refreshDeskList();
  }

  deleteDesk(deskID: number): void {
    this.service.deleteDesk(deskID);
  }
}
