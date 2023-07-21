import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

@Directive({
  selector: '[workHoursValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: WorkHoursValidatorDirective,
      multi: true,
    },
  ],
})
export class WorkHoursValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value != typeof String) return { type: false };
    if (Validators.pattern('[0-9]{2}:[0-9]{2}:[0-9]{2}'))
      return { correctFormat: false };
    if (control.value < '06:00:00' || control.value > '20:00:00')
      return { matchesWorkHours: false };
    return null;
  }
}
