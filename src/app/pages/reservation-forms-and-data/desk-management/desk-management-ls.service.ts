import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Desk } from '../interfaces/desk';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Injectable()
export class DeskManagementLSService {
  constructor(private lsDeskService: LocalstorageDeskListService) {
    this.forceDeskListRefresh();
  }
  deskList: Desk[] = [];
  value: any;

  getDeskList(): Observable<Desk[]> {
    return of(this.deskList);
  }

  /**
   * Forces this instance's local deskList value to change to the one in localStorage
   *
   */
  private forceDeskListRefresh(): void {
    this.value = localStorage.getItem('deskList');
    this.deskList = this.value ? JSON.parse(this.value) : [];
  }

  /**
   * Updates localStorage deskList to local deskList's value
   */
  private pushDeskListToLS(): void {
    localStorage.setItem('deskList', JSON.stringify(this.deskList));
  }

  addDesk(newDesk: Desk): Observable<boolean> {
    /**@Issues
     * Somehow somewhere during v1 of this function the of(this.deskList)
     * observables (previously passed by getDeskList()) bug out and
     * stop passing values.
     *
     * But somehow the v2 works even though its less optimal. May be that refreshing the list
     * during that function bugs it out */

    // --------------- 1st version (see: @Issues) ----------------
    // this.forceDeskListRefresh();
    // if (this.deskList.find((m: any) => m.deskID === newDesk.deskID)) {
    //   alert('stanowisko już istnieje');
    //   return of(false);
    // }
    // this.deskList.push(newDesk);
    // this.pushDeskListToLS();
    // console.log(this.deskList);
    // return of(true);
    // ------------------ 2nd version ---------------------------
    let deskListInLS: any = localStorage.getItem('deskList') ?? '[]';
    deskListInLS = JSON.parse(deskListInLS as string) ?? [];
    if (deskListInLS.find((m: any) => m.deskID === newDesk.deskID)) {
      alert('stanowisko już istnieje');
      return of(false);
    }
    this.deskList.push(newDesk);
    this.pushDeskListToLS();
    return of(true);
  }

  deleteDesk(desk: Desk): Observable<Boolean> {
    let deskToDeleteIndex: number = this.deskList.indexOf(desk);
    if (deskToDeleteIndex == -1) {
      alert('Nie ma takiego stanowiska');
      return of(false);
    }
    if (this.lsDeskService.hasAnyReservations(desk)) {
      alert('Nie można usunąć stanowiska z powodu obecnych na nie rezerwacji');
      if (confirm('Czy chcesz usunąć wszystkie rezerwacje na to stanowisko?'))
        this.lsDeskService.deleteReservationsOnDesk(desk);
      else return of(false);
    }
    console.log('changed deskList');
    this.deskList.splice(deskToDeleteIndex, 1);
    this.pushDeskListToLS();
    return of(true);
  }

  deskExists(deskID: number): boolean {
    return this.deskList.findIndex((m: any) => m.deskID == deskID) != -1;
  }

  updateDeskFunctionality(deskID: number, doesItFunction: boolean): void {
    let deskIndex = this.deskList.findIndex((m: any) => m.deskID == deskID);
    if (deskIndex == -1) {
      console.error('This desk doesnt exist');
      return;
    }
    console.log('Set functionality to ' + doesItFunction);
    this.deskList[deskIndex].functional = doesItFunction;
    this.pushDeskListToLS();
  }
}
