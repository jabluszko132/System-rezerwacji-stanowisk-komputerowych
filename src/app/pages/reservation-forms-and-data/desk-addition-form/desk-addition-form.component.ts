import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {filter, Subject, switchMap} from 'rxjs';

const action$ = new Subject<number>;


@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  newDeskID: FormControl = new FormControl(null,[Validators.required]);
  ngOnInit() {
    action$.pipe(filter(val => val === this.newDeskID.value),switchMap(d => {
      return this.service.addDesk(d)})).subscribe();
  }
  addDesk() {
    if(this.newDeskID.invalid) return;
    action$.next(this.newDeskID.value);
  }
}
