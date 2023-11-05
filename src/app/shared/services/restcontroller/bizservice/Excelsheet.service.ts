import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill001mb } from '../entities/bill001mb';
import { BaseService } from '../../services/base.service';

@Injectable()
export class ExcelsheetManager extends BaseService {
  private billfUrl: string = `${environment.apiUrl}/excelsheet`;

  downExcel(startdate: any, enddate: any) {
    let data: any = {};
    data['startdate'] = startdate;
    data['enddate'] = enddate;
    return this.getCallService1(`${this.billfUrl}` + "/excel", data)
  }
}
