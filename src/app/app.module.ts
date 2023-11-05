import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DepartmentsManager } from './shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from './shared/services/restcontroller/bizservice/auth-manager.service';
import { RegisterManager } from './shared/services/restcontroller/bizservice/register.service';
import { RoleManager } from './shared/services/restcontroller/bizservice/role.service';
import { StatusSettingManager } from './shared/services/restcontroller/bizservice/status-setting.service';
import { UnitDepartManager } from './shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from './shared/services/restcontroller/bizservice/unitmaster.service';
import { BaseService } from './shared/services/services/base.service';
import { CalloutService } from './shared/services/services/callout.service';
import { DataSharedService } from './shared/services/services/datashared.service';
import { TotalValueRenderer } from './shared/services/total-value-component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { PersonManager } from './shared/services/restcontroller/bizservice/person.service';
import { UserManager } from './shared/services/restcontroller/bizservice/user.service';
import { ConformationComponent } from './shared/conformation/conformation.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TotalValueRenderer,
    UserRegistrationComponent,
    ConformationComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatTabsModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    AgGridModule.withComponents([]),

  ],

  exports: [NgbCollapseModule],
  providers: [
    AuthManager,
    CalloutService,
    RoleManager,
    DataSharedService,
    BaseService,
    RegisterManager,
    DepartmentsManager,
    DatePipe,
    UnitManagerManager,
    UnitDepartManager,
    StatusSettingManager,
    PersonManager,
    UserManager,

    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule { }
