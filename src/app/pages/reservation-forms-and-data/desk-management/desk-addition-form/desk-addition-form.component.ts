import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {filter, Subject, switchMap, takeUntil} from 'rxjs';
import { DeskManagerService } from '../desk-manager.service';


@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit, OnDestroy {
  constructor(private service: DeskManagerService) {}

  private action$: Subject<any> = new Subject<any>;
  private endSubs$: Subject<void> = new Subject<void>;

  newDeskID: FormControl = new FormControl(null,[Validators.required]);

  addDesk(): void {
    if(this.newDeskID.invalid) {
      alert('Proszę podać ID nowego stanowiska')
      return;
    }
    this.action$.next(this.newDeskID.value);
  }

  ngOnInit() {
    this.action$.pipe(filter(val => val === this.newDeskID.value),switchMap(d => {
      return this.service.addDesk({deskID: d, functional: true})}), takeUntil(this.endSubs$)).subscribe();
  }
  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
