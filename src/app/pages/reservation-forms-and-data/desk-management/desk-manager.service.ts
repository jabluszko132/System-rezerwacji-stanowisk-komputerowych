import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Desk } from '../interfaces/desk';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Injectable()
export class DeskManagerService {
  constructor(private lsDeskService: LocalstorageDeskListService) {
    this.deskList$.subscribe();
    this.forceDeskListRefresh();
  }

  //---------------------- Private properties ------------------------------------
  private deskList$: BehaviorSubject<Desk[]> = this.lsDeskService.getDeskList();
  private deskList: Desk[] = [];

  //----------------------- Public methods -----------------------------------

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
    if (!this.lsDeskService.canDeskBeDeleted(desk)) return of(false);
    console.log('changed deskList');
    this.deskList.splice(deskToDeleteIndex, 1);
    this.pushDeskListToLS();
    return of(true);
  }

  deskExists(deskID: number): boolean {
    return this.deskList.findIndex((m: any) => m.deskID == deskID) != -1;
  }

  getDeskList(): Observable<Desk[]> {
    return of(this.deskList);
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

  //----------------------- Private methods ----------------------------------

  /**
   * Forces this instance's local deskList value to change to the one in localStorage
   *
   */
  private forceDeskListRefresh(): void {
    this.deskList = this.deskList$.getValue();
  }

  /**
   * Updates localStorage deskList to local deskList's value
   */
  private pushDeskListToLS(): void {
    this.deskList$.next(this.deskList);
  }
}
