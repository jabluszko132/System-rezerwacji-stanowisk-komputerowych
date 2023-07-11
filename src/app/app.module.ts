import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponentsModule } from './basic-components/basic-components.module';
import { PagesModule } from './pages/pages.module';
import 'zone.js';
import { PreloadAllModules } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BasicComponentsModule,
    PagesModule,
  ],
  providers: [PreloadAllModules],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {}
