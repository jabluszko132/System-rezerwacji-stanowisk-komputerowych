import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';


const action$: Subject<any> = new Subject<any>;
const endSubs$: Subject<null> = new Subject<null>;


@Component({
  selector: 'app-desk-malfunction-report-form',
  templateUrl: './desk-malfunction-report-form.component.html',
  styleUrls: ['./desk-malfunction-report-form.component.css'],
})
export class DeskMalfunctionReportFormComponent implements OnInit, OnDestroy{
  constructor(private service: LocalstorageDeskListService, private fb: FormBuilder ) {}

  reportForm = this.fb.group({
    deskID: [1,[Validators.required]],
    description: ''
  });

  deskID = this.reportForm.controls.deskID;
  description = this.reportForm.controls.description;

  ngOnInit() {
    action$.pipe(filter(val => val === this.reportForm.value),switchMap(d => {
      return this.service.reportMalfunctionOnDesk(d)}), takeUntil(endSubs$)).subscribe();
  }
  ngOnDestroy() {
    endSubs$.complete();
  }

  report(): void {
    if(this.deskID.errors || this.description.errors)
    {
      alert('Podaj poprawne wartości we wszystkich polach formularza')
      return;
    }else action$.next(this.reportForm.value);
  }
}
