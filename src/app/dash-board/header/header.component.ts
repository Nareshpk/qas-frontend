import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() loguts: EventEmitter<any> = new EventEmitter();

  username: any;
  constructor(private router: Router,
    private authManager: AuthManager,
  ) { }

  ngOnInit(): void {
    this.username = this.authManager.getcurrentUser.username
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  submit() {
    this.authManager.logout("");
    this.loguts.emit()
  }
}
