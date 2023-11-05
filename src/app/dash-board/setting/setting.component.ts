import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
    isOpen: boolean = false;
    parentMenuString: string = '';
    childMenuString: string = '';
    isActive: boolean | undefined;
    user?: User001mb;
    themes: any;
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private authManager: AuthManager,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager
    ) {}

    ngOnInit(): void {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });

        this.authManager.currentUserSubject.subscribe((object: any) => {

        });
    }
}
