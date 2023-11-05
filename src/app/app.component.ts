import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
