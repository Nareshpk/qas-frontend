import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  sideBarOpens: boolean = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  loguts() {
    this.sideBarOpens = false
  }

  constructor() { }
  ngOnInit(): void {
    this.sideBarOpens = true;
  }
}
