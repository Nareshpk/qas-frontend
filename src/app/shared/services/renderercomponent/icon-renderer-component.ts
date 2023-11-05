import { Component, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { environment } from 'src/environments/environment';
import { AuthManager } from '../restcontroller/bizservice/auth-manager.service';

@Component({
    selector: 'app-icon-renderer',
    templateUrl: './icon-renderer-component.html',
    styleUrls: ['./icon-renderer-component.css']
})
export class IconRendererComponent implements ICellRendererAngularComp {

    params: any;
    label: string = "";
    toggle: boolean = false;
    public downloadUrl: string = `${environment.apiUrl}/breakdownreg/download/`;
    public downloadUrl2: string = `${environment.apiUrl}/empdetails/download/`;
    public downloadUrl3: string = `${environment.apiUrl}/legal/download/`;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(private authManager: AuthManager) { }


    agInit(params: any): void {
        this.authManager.currentUserSubject.subscribe((object: any) => {
        });
        this.params = params;
        this.label = this.params.label || null;
        this.downloadUrl = this.downloadUrl + this.params.data.originalfilename;
        this.downloadUrl2 = this.downloadUrl2 + this.params.data.originalfilename;
        this.downloadUrl3 = this.downloadUrl3 + this.params.data.originalfilename;

    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event: any) {
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data
            }
            this.params.onClick(this.params);
        }
    }
    changeType(num: any) {
        this.toggle = !this.toggle;
    }

}
