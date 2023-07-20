import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import {filter, Subject, switchMap, takeUntil} from 'rxjs';

const action$: Subject<any> = new Subject<any>;
const endSubs$: Subject<null> = new Subject<null>;

@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit, OnDestroy {
  constructor(private service: LocalstorageDeskListService) {}

  newDeskID: FormControl = new FormControl(null,[Validators.required]);
  ngOnInit() {
    action$.pipe(filter(val => val === this.newDeskID.value),switchMap(d => {
      return this.service.addDesk({deskID: d})}), takeUntil(endSubs$)).subscribe();
  }
  ngOnDestroy() {
    endSubs$.complete();
  }

  addDesk(): void {
    if(this.newDeskID.invalid) {
      alert('Proszę podać ID nowego stanowiska')
      return;
    }
    action$.next(this.newDeskID.value);
  }
}
