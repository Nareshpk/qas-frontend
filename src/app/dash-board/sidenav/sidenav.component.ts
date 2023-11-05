import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/config/role.enum';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userRoll: boolean = true;
  roledata: Role
  constructor(
    private authManager: AuthManager,
  ) { }

  ngOnInit(): void {

    if (this.authManager.getcurrentUser.role.rolename === 'superadmin' || this.authManager.getcurrentUser.role.rolename === 'manager' || this.authManager.getcurrentUser.role.rolename === 'admin') {
      this.userRoll = true
    } else {
      this.userRoll = false
    }
  }

}
