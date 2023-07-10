import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightblueHeaderComponent } from './lightblue-header/lightblue-header.component';



@NgModule({
  declarations: [LightblueHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [LightblueHeaderComponent],
})
export class BasicComponentsModule { }
