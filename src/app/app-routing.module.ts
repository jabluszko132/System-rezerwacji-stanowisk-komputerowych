import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';

const routes: Routes = [
  //----------------pages--------------------
  { path: 'home', component: MainPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'reservation', component: ReservationPageComponent },

  { path: 'reports', component: ReportsPageComponent },
  //--------------error pages-------------------
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
