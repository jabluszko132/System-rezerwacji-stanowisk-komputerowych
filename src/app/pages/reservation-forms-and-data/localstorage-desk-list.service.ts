import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Reservation } from './interfaces/reservation';
import { Desk } from './interfaces/desk';

@Injectable({providedIn: 'root'})
export class LocalstorageDeskListService implements OnDestroy {
  //Rename ideas: DeskServicesCooperator, DeskCommon
  constructor() {
    this.deskList$
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => this.pushDeskListToLS());
    this.forceDeskListRefresh();
    this.reservationList$
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => this.pushReservationListToLS());
  }

  //---------------------------- Private properties -----------------------------------------

  private deskList$: BehaviorSubject<Desk[]> = new BehaviorSubject<Desk[]>(
    this.lsGetDeskList()
  );
  private deskList: Desk[] = this.deskList$.getValue();
  private endSubs$: Subject<void> = new Subject<void>
  private reservationList$: BehaviorSubject<Reservation[]> =
    new BehaviorSubject<Reservation[]>(this.lsGetReservationList());
  private reservationList: Reservation[] = this.reservationList$.getValue();

  //---------------------------- Public methods ---------------------------------------------

  canDeskBeDeleted(desk: Desk): boolean {
    if (this.hasAnyReservations(desk)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
      if (confirm('Czy chcesz usunąć wszystkie rezerwacje na to stanowisko?'))
        this.deleteReservationsOnDesk(desk);
      else false;
    }
    return true;
  }

  deleteReservationsOnDesk(desk: Desk): void {
    let reservationIndex: number = this.reservationList.findIndex(
      (m: any) => m.deskID == desk.deskID
      // console.log(m.deskID);
      // console.log(desk.deskID);
      //^I love it when the only thing that
      //you change in your code is adding
      //some logs and immediately deleting them and it somehow fixes
      //everything
    );
    while (reservationIndex != -1) {
      this.unsafeDeleteReservation(this.reservationList[reservationIndex]);
      reservationIndex = this.reservationList.findIndex((m: any) =>m.deskID == desk.deskID);
    }
    this.reservationList$.next(this.reservationList);
  }

  getDeskList(): BehaviorSubject<Desk[]> {
    return this.deskList$;
  }

  getReservationList(): BehaviorSubject<Reservation[]> {
    return this.reservationList$;
  }

  hasAnyReservations(desk: Desk): boolean {
    this.forceReservationListRefresh();
    return (
      this.reservationList.findIndex((m: any) => m.deskID == desk.deskID) != -1
    );
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  //---------------------------- Private methods --------------------------------------------

  /**
   * Forces this instance's local deskList value to change to the one in localStorage
   *
   */
  private forceDeskListRefresh(): void {
    this.deskList = this.deskList$.getValue();
  }

  /**
   * Forces this instance's local reservationList value to change to the one in localStorage
   */
  private forceReservationListRefresh(): void {
    this.reservationList = this.reservationList$.getValue();
  }

  private lsGetDeskList(): Desk[] {
    let value: string | null = localStorage.getItem('deskList'); //when throws an error that value is undefined clear ls
    return value ? JSON.parse(value) : [];
  }

  private lsGetReservationList(): Reservation[] {
    let value: string | null = localStorage.getItem('reservationList');
    return value ? JSON.parse(value) : [];
  }

  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushDeskListToLS(): void {
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
  }

  /**
   * Updates localStorage reservationList to local reservationList's value
   */
  private pushReservationListToLS(): void {
    this.sortReservationListByDate(this.reservationList);
    localStorage.setItem(
      'reservationList',
      JSON.stringify(this.reservationList)
    );
  }

  // private sortDeskList(): void {
  //   this.deskList.sort((a, b) => a.deskID - b.deskID);
  // }
  private sortReservationListByDate(list: Reservation[]): void {
    list.sort((a, b) => {
      if (a.reservationDate > b.reservationDate) return 1;
      if (a.reservationDate < b.reservationDate) return -1;
      return 0;
    });
  }

  /**
   * This is an unsafe but faster version of deleteReservation method.
   * It doesnt check if the reservation exists on the table. Dont use it
   * unless you are absolutely sure that the element exists
   */
  private unsafeDeleteReservation(reservation: Reservation) {
    try {
      this.reservationList.splice(
        this.reservationList.findIndex((m: any) => m == reservation),
        1
      );
    } catch (e) {
      console.error(e);
    }
  }

  // deleteExpiredReservations(): void {
  //   let currentDate = this.currentDateString();
  //   for (let reservation of this.reservationList) {
  //     if (reservation.reservationDate < currentDate) {
  //       this.unsafeDeleteReservation(reservation);
  //     } else return;
  //   }
  // }
}

/** todo
>get the select reservation hours component block reserving desks that
have just been deleted
  ideas{
    Subject: use a subject as eventEmitter to make the component change on deleteReservation and at the end of deleteReservationsOnDesk (solves this problem and the problem below + dont have to worry about emmiting events after possibly adding another way of deleting a reservation/desk)

    In&Out: use input and output decorators and make the desk list emit an 
    event every time something is deleted and the select reservation hours to listen to it

    Simple: make the 2nd submit also check if the desk exists - otherwise: alert (but it will update even if theres nothing new)
    
  }
>get the select reservation hours component to update if a reservation was cancelled
>figure out when and where to complete() the subjects deskList$ and reservationList$
>think of a better name for this service and apply it
*/

/**questions
>how to use action$ to handle 2 events (is double subscription necessary)
>what should happen when user selects hours between which are any reserved hours*/
