import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { UnitDepartManager } from 'src/app/shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from 'src/app/shared/services/restcontroller/bizservice/unitmaster.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';



@NgModule({
  declarations: [SettingComponent,],
  imports: [
    CommonModule,
    SettingRoutingModule,
    // NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    // FlexLayoutModule,
    // BreadcrumbModule,
    MatSidenavModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    UserManager, RoleManager, UnitManagerManager, StatusSettingManager, UnitDepartManager
  ]
})

export class SettingModule { }
