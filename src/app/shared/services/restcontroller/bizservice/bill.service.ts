import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill001mb } from '../entities/bill001mb';
import { BaseService } from '../../services/base.service';

@Injectable()
export class BillManager extends BaseService {
  private billfUrl: string = `${environment.apiUrl}/bills`;


  allbill(bslno2: number) {
    console.log("bslno2", bslno2);

    let data: any = {};
    data['bslno2'] = bslno2;
    return this.getCallService(`${this.billfUrl}` + "/findAll", data);
  }

  getCount() {
    return this.getCallService(`${this.billfUrl}` + '/getCount');
  }
  billsave(bill001mb: Bill001mb) {
    return this.postCallService(`${this.billfUrl}` + '/save', {}, bill001mb);
  }

  billupdate(bill001mb: Bill001mb) {
    return this.putCallService(`${this.billfUrl}` + "/update", {}, bill001mb);
  }

  billdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.billfUrl}` + "/delete", data);
}

  pdfId(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService1(`${this.billfUrl}` + "/pdf", data)
  }
  datepdfId(id: any, days: any) {
    let data: any = {};
    data['id'] = id;
    data['days'] = days;
    return this.getCallService1(`${this.billfUrl}` + "/pdfdate", data)
  }
  paymentpdfId(id: any, days: any, payment: any) {
    let data: any = {};
    data['id'] = id;
    data['days'] = days;
    data['payment'] = payment;
    return this.getCallService1(`${this.billfUrl}` + "/pdfdatepaymetn", data)
  }

  InvoicepdfId(id: any, days: any) {
    let data: any = {};
    data['id'] = id;
    data['days'] = days;
    return this.getCallService1(`${this.billfUrl}` + "/pdfinvoice", data)
  }
}
