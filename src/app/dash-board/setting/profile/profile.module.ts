import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { PasswordComponent } from './password/password.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsernameComponent } from './username/username.component';



@NgModule({
  declarations: [
    ProfileComponent,
    RegistrationComponent,
    PasswordComponent,
    UsernameComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    // FlexLayoutModule,
    // BreadcrumbModule,
    MatSidenavModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    LoginManager,
    AuthManager,
    UserManager,
    PersonManager,
    DepartmentsManager
  ],
})
export class ProfileModule { }
