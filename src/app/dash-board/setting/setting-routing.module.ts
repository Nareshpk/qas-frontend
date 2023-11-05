import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
            {
                path: 'app-profile',
                loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
