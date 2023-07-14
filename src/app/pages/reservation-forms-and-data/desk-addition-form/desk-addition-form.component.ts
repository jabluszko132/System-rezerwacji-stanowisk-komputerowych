import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {filter, Subject, switchMap, of, from} from 'rxjs';

const action$ = new Subject<any>;


@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  newDeskID: FormControl = new FormControl();
  // numbers1$ = from([1,2,3,4,5, 6, 7, 8, 9]);
  // numbers2(x:number) {return of(2*x)}

  ngOnInit() {
    // this.numbers1$.pipe(switchMap((d)=>{ return this.numbers2(d)})).subscribe((d) => {
    //   console.log(d);
    // })
    action$.pipe(switchMap(d => {
      console.log(d);
      return this.service.addDesk(d)})).subscribe();
  }

  addDesk() {
    action$.next(this.newDeskID.value);
    // this.service.addDesk(this.newDeskID.value);
  }
}
