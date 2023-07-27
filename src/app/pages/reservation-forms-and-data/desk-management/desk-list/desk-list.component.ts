import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Desk } from '../../interfaces/desk';
import { DeskManagementLSService } from '../desk-management-ls.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private service: DeskManagementLSService) {}

  deskList$: Observable<any> = this.service.getDeskList();

  ngOnInit() {
    this.deskList$.subscribe();
  }

  deleteDesk(desk: Desk): void {
    this.service.deleteDesk(desk);
  }
}
