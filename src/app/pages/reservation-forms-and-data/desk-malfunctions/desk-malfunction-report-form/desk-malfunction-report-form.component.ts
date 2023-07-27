import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { DeskMalfunctionReporterService } from '../desk-malfunction-reporter.service';




@Component({
  selector: 'app-desk-malfunction-report-form',
  templateUrl: './desk-malfunction-report-form.component.html',
  styleUrls: ['./desk-malfunction-report-form.component.css'],
})
export class DeskMalfunctionReportFormComponent implements OnInit, OnDestroy{
  constructor(private service: DeskMalfunctionReporterService, private fb: FormBuilder ) {}

  private action$: Subject<any> = new Subject<any>;
  private endSubs$: Subject<void> = new Subject<void>;
  
  reportForm = this.fb.group({
    deskID: [1,[Validators.required]],
    description: ['',[Validators.maxLength(500)]],
    dealtWith: false
  });

  deskID = this.reportForm.controls.deskID;
  description = this.reportForm.controls.description;

  report(): void {
    if(this.deskID.errors || this.description.errors)
    {
      alert('Podaj poprawne wartości we wszystkich polach formularza')
      return;
    }else this.action$.next(this.reportForm.value);
  }

  ngOnInit() {
    this.action$.pipe(filter(val => val === this.reportForm.value),switchMap(d => 
      this.service.reportMalfunctionOnDesk(d)), takeUntil(this.endSubs$)).subscribe();
  }
  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
