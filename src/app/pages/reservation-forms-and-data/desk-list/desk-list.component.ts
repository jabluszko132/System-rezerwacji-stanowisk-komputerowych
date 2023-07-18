import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  deskList: Observable<any> = this.service.getDeskList();

  ngOnInit() {
    this.deskList.subscribe(() => {});
  }

  deleteDesk(deskID: number): void {
    this.service.deleteDesk(deskID);
  }
}
