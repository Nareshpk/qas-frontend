import { Component, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { environment } from 'src/environments/environment';
import { AuthManager } from './restcontroller/bizservice/auth-manager.service';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'total-value-component',
  templateUrl: './total-value-component.html',
  styleUrls: ['./total-value-component.scss']
})
export class TotalValueRenderer implements ICellRendererAngularComp {
  params: any;
  label: string = "";
  toggle: boolean = false;
  public cellValue: string;
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
      this.cellValue = this.getValueToDisplay(params);

  }

  refresh(params?: any): boolean {
    this.cellValue = this.getValueToDisplay(params);
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
  buttonClicked() {
    alert(`${this.cellValue} medals won!`)
}
getValueToDisplay(params: ICellRendererParams) {
  return params.valueFormatted ? params.valueFormatted : params.value;
}
}
