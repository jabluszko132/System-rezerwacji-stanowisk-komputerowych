import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { Desk } from '../interfaces/desk';
import { NumberRange } from '../interfaces/number-range';
import { DeskManagerService } from '../desk-management/desk-manager.service';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
const date = new Date();

@Injectable()
//after renaming it came to me that i named it reservator instead of reserver
//but now i think its funnier this way
export class ReservatorService {
  constructor(
    private lsDeskService: DeskManagerService,
    private mainService: LocalstorageDeskListService
  ) {
    this.reservationList$.subscribe();
    this.forceReservationListRefresh();
    this.mainService.testSubj
      .pipe(takeUntilDestroyed())
      .subscribe(() => console.log('reservator got it'));
  }

  //---------------------------- Private properties -------------------------------------------
  private reservationList$: BehaviorSubject<Reservation[]> =
    this.mainService.getReservationList();
  private reservationList: Reservation[] = this.reservationList$.getValue();

  //----------------------------- Public methods ----------------------------------------------

  /**
   * Returns list of ranges of hours available for reservation on a given desk and day
   *
   */
  availableReservationHoursOnDay(deskID: number, date: string): NumberRange[] {
    if (!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      console.error('Date was put in an incorrect format (not rrrr-mm-dd)');
      return [];
    }
    if (!this.lsDeskService.deskExists(deskID)) {
      console.error('The given desk doesnt exist on deskList');
      return [];
    }
    let reservationsOnDesk: Reservation[] = this.deskReservationsOnDay(
      deskID,
      date
    );
    if (reservationsOnDesk.length == 0)
      return [
        {
          from: 6,
          to: 18,
        },
      ];
    this.sortReservationListByDateAndHour(reservationsOnDesk);
    let availableHours: NumberRange[] = [];
    let lastCheckedHour: number = 6;
    let nextReservedHour: number;
    let i: number;
    for (i = 0; i < reservationsOnDesk.length; i++) {
      nextReservedHour = reservationsOnDesk[i].startHour;
      if (nextReservedHour > lastCheckedHour) {
        //&& lastCheckedHour != 6
        availableHours.push({
          from: lastCheckedHour,
          to: nextReservedHour,
        });
      }
      lastCheckedHour = reservationsOnDesk[i].endHour;
    }
    if (lastCheckedHour < 18)
      availableHours.push({
        from: lastCheckedHour,
        to: 18,
      });
    return availableHours;
  }

  deleteReservation(reservation: Reservation): Observable<Boolean> {
    let reservationToDeleteIndex: number =
      this.reservationList.indexOf(reservation);
    if (reservationToDeleteIndex == -1) {
      alert('Nie ma takiej rezerwacji');
      return of(false);
    }
    this.reservationList.splice(reservationToDeleteIndex, 1);
    this.pushReservationListToLS();
    return of(true);
  }

  /**
   * Returns list of reservations on given desk and date
   */
  deskReservationsOnDay(deskID: number, date: string): Reservation[] {
    let startIndex = this.reservationList.findIndex(
      (m: any) => m.reservationDate == date
    );
    if (startIndex == -1) return [];
    let reservations: Reservation[] = [];
    for (let i = startIndex; i <= this.reservationList.length - 1; i++) {
      if (this.reservationList[i].deskID == deskID)
        reservations.push(this.reservationList[i]);
      if (this.reservationList[i].reservationDate != date) break;
    }
    return reservations;
  }

  getReservationList(): Observable<Reservation[]> {
    // this.deleteExpiredReservations();
    return of(this.reservationList);
  }

  hasAnyReservations(desk: Desk): boolean {
    return (
      this.reservationList.findIndex((m: any) => m.deskID == desk.deskID) != -1
    );
  }

  /**
   * Return true if a reservation data and time collids with any on the reservationList
   *
   * @Important Works only if reservationList is previously sorted by date
   */
  reservationTimeCollide(reservation: Reservation): boolean {
    let reservationsForDesk = this.deskReservationsOnDay(
      reservation.deskID,
      reservation.reservationDate
    );
    for (let x of reservationsForDesk) {
      if (x.startHour >= reservation.endHour) continue;
      else if (x.endHour > reservation.startHour) return true;
    }
    return false;
  }

  reserveDesk(reserveObj: Reservation): Observable<boolean> {
    if (reserveObj.reservationDate < this.currentDateString()) {
      alert('Data rezerwacji jest wcześniejsza niż obecna');
      return of(false);
    }
    let deskListInLS: any = localStorage.getItem('deskList');
    if (deskListInLS != null) {
      deskListInLS = JSON.parse(deskListInLS);
      let deskIndex: number = deskListInLS.findIndex(
        (m: any) => m.deskID == reserveObj.deskID
      );
      if (deskIndex == -1) {
        alert('Nie ma takiego stanowiska');
        return of(false);
      }
      if (!deskListInLS[deskIndex].functional) {
        alert('To stanowisko jest niesprawne. Zarezerwuj inne');
        return of(false);
      }
      let reservationListInLS: any = localStorage.getItem('reservationList');
      if (reservationListInLS != null) {
        reservationListInLS = JSON.parse(reservationListInLS);
        if (!this.reservationTimeCollide(reserveObj)) {
          this.addReservationOnNewDate(reserveObj);
          return of(true);
        } else {
          alert('To stanowisko już wtedy jest zarezerwowane');
        }
      } else {
        this.addReservationOnNewDate(reserveObj);
        return of(true);
      }
    } else {
      alert(
        'Lista stanowisk jest pusta. Dodaj stanowisko aby móc je zarezerwować'
      );
    }
    return of(false);
  }

  //------------------------------------ Private methods ----------------------------------

  private addReservationOnNewDate(reserveObj: Reservation): void {
    this.reservationList.push(reserveObj);
    this.pushReservationListToLS();
  }

  private currentDateString(): string {
    return (
      date.getFullYear().toString().padStart(4, '0') +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
  }

  /**
   * Forces this instance's local reservationList value to change to the one in localStorage
   */
  private forceReservationListRefresh(): void {
    this.reservationList = this.reservationList$.getValue();
  }

  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushReservationListToLS(): void {
    this.sortReservationListByDateAndHour(this.reservationList);
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
    this.reservationList$.next(this.reservationList);
  }

  private sortReservationListByDateAndHour(list: Reservation[]): void {
    list.sort((a, b) => {
      if (a.reservationDate > b.reservationDate) return 2;
      if (a.reservationDate < b.reservationDate) return -2;
      return a.startHour > b.startHour ? 1 : -1;
    });
  }
}
