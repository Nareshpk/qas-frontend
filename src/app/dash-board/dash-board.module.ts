import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeeManager } from '../shared/services/restcontroller/bizservice/Employee.service';
import { ExcelsheetManager } from '../shared/services/restcontroller/bizservice/Excelsheet.service';
import { BillManager } from '../shared/services/restcontroller/bizservice/bill.service';
import { ExpensesManager } from '../shared/services/restcontroller/bizservice/expenses.service';
import { RegisterManager } from '../shared/services/restcontroller/bizservice/register.service';
import { RoleManager } from '../shared/services/restcontroller/bizservice/role.service';
import { SalaryManager } from '../shared/services/restcontroller/bizservice/salary.service';
import { WorkMehodManager } from '../shared/services/restcontroller/bizservice/workmehtod.service';
import { ToastService } from '../shared/services/restcontroller/callout/toast.service';
import { BaseService } from '../shared/services/services/base.service';
import { AddComponent } from './add/add.component';
import { AmountComponent } from './amount/amount.component';
import { AuditDeatailComponent } from './audit-deatail/audit-deatail.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { BodyComponent } from './body/body.component';
import { CompanyExpenceComponent } from './company-expence/company-expence.component';
import { CustomerComponent } from './customer/customer.component';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { WorkMethodComponent } from './work-method/work-method.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    BillPageComponent,
    PaymentComponent,
    // AddPopupComponent,
    AmountComponent,
    AddComponent,
    BodyComponent,
    WorkMethodComponent,
    EmployeeDetailComponent,
    EmployeeSalaryComponent,
    CompanyExpenceComponent,
    CustomerComponent,
    AuditDeatailComponent,
    UserDetailComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  exports: [NgbCollapseModule],
  // tslint:disable-next-line:max-line-length
  providers: [BillManager,  ExcelsheetManager, ExpensesManager, ToastService, EmployeeeManager, SalaryManager, WorkMehodManager, BaseService, DatePipe, NgbModal, RegisterManager, RoleManager],
  bootstrap: [DashBoardComponent, HomeComponent, BillPageComponent],
})
export class DashBoardModule { }
