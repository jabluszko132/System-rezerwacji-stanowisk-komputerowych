import { Component, OnInit } from '@angular/core';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  newDeskId: number = 0;

  ngOnInit() {}

  addDesk(): void {
    this.service.addDesk(this.newDeskId);
  }
}
