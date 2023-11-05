import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { HomeComponent } from './home/home.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { AddComponent } from './add/add.component';
import { BodyComponent } from './body/body.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'app-dash-board', redirectTo: 'app-dash-board' },
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: 'app-body', component: BodyComponent,
      },
      {
        path: "app-home",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      },
      {
        path: "app-user-detail",
        loadChildren: () => import("./user-detail/user-detail.module").then(m => m.UserDetailModule)
      },
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      // {
      //   path: 'home', component: HomeComponent,
      // },
      { path: 'app-add', component: AddComponent },
      { path: 'app-bill-page', component: BillPageComponent },
    ],

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
