import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalstorageDeskListService } from '../localstorage-desk-list.service';

@Component({
  selector: 'app-desk-addition-form',
  templateUrl: './desk-addition-form.component.html',
  styleUrls: ['./desk-addition-form.component.css'],
})
export class DeskAdditionFormComponent implements OnInit {
  constructor(private service: LocalstorageDeskListService) {}

  newDeskId: number = 0;
  newDeskID: FormControl = new FormControl();
  ngOnInit() {}

  addDesk() {
    this.service.addDesk(this.newDeskID.value);
  }
}
