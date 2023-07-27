import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Desk } from '../../interfaces/desk';
import { DeskManagerService } from '../desk-manager.service';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css'],
})
export class DeskListComponent implements OnInit {
  constructor(private service: DeskManagerService) {}

  deskList$: Observable<any> = this.service.getDeskList();

  ngOnInit() {
    this.deskList$.subscribe();
  }

  deleteDesk(desk: Desk): void {
    this.service.deleteDesk(desk);
  }
}
