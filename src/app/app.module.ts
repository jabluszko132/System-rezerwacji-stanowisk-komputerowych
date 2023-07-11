import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import 'zone.js';
import { PreloadAllModules } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
  ],
  //^adding new modules to these imports (except for the ones already in depenencies) breakes routing -
  //router-outlet doesnt even load the home page
  //any newly created modules import into the pages module
  providers: [PreloadAllModules],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {}
