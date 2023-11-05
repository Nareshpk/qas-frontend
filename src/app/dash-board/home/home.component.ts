import { Component, OnInit, HostBinding } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';

import { AmountComponent } from '../amount/amount.component';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BillManager } from 'src/app/shared/services/restcontroller/bizservice/bill.service';
import { Bill001mb } from 'src/app/shared/services/restcontroller/entities/bill001mb';
import { Router } from '@angular/router';
import { subDays } from 'date-fns';
import * as moment from 'moment';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public gridOptions: GridOptions | any;
  dateForm: FormGroup | any;
  bill001mb: Bill001mb[];
  bslno2: number;
  frameworkComponents: any;
  slNo: number | any;
  datevalue: any;
  dayvalue: any;
  paymetvalue: any;
  previewWeek = new FormControl(null);
  previewMonth = new FormControl(null);
  yesterdayDate = subDays(new Date(), 0);
  date = new FormControl(moment());
  // TimeSheet StartDate
  selectedDate = new FormControl(this.yesterdayDate);
  today = new Date();
  tomorrow = new Date();
  dayilybutton: boolean = true;
  weeklybutton: boolean = false;
  monthlybutton: boolean = false;
  TabEvent: boolean = true;;
  TabsEvent: boolean = false;;
  Weekdeatails: any[] = [];
  monthdeatails: any[] = [];

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(
    private formBuilder: FormBuilder,
    private billManager: BillManager,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private router: Router,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }



  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      date: [''],
      pmethod: [''],
      days: [''],
    });
    this.loadData();
    this.createDataGrid001();
  }

  loadData() {
    this.billManager.allbill(this.bslno2).subscribe(response => {
      this.bill001mb = deserialize<Bill001mb[]>(Bill001mb, response);
      if (this.bill001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.bill001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  OnChagnes(event: any, dayvalue: string) {
    if (dayvalue === 'Day') {
      this.dayilybutton = true
      this.weeklybutton = false
      this.monthlybutton = false
    } else if (dayvalue === 'Week') {
      this.dayilybutton = false
      this.weeklybutton = true
      this.monthlybutton = false
    } else if (dayvalue === 'Month') {
      this.dayilybutton = false
      this.weeklybutton = false
      this.monthlybutton = true
    }
  }
  sundayFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day === 0;
  };

  MontFilter = (d: Date): boolean => {
    const day = d.getDate();
    return day === 1
  };

  valueChanged(event: any) {
    this.Weekdeatails = [];
    // this.loadData()
    this.billManager.allbill(this.bslno2).subscribe(response => {
      this.bill001mb = deserialize<Bill001mb[]>(Bill001mb, response);
      let weekdate = new Date(this.previewWeek.value);
      let monthdate = new Date(this.previewMonth.value);
      let WeekDate = this.datepipe.transform(weekdate, 'yyyy-MM-dd');
      let MonthDate = this.datepipe.transform(monthdate, 'yyyy-MM-dd');
      if (this.weeklybutton == true) {
        let days = [];
        const weekdays = new Date(WeekDate);
        var dayOfWeek = 7;
        var date = new Date(weekdays);
        var diff = date.getDay() - dayOfWeek;
        if (diff <= 0) {
          let date = (-1) * diff
          for (let i = 0; i < date; i++) {
            days.push(
              moment(WeekDate)
                .add(i, "days")
                .format("DD-MM-YYYY")
            );
          }
        }

        for (let i = 0; i < this.bill001mb.length; i++) {
          for (let j = 0; j < days.length; j++) {
            if (this.bill001mb[i].date === days[j]) {
              this.Weekdeatails.push(this.bill001mb[i]);
            }
          }
        }


        if (this.Weekdeatails.length > 0) {
          this.gridOptions?.api?.setRowData(this.Weekdeatails);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      }


    });
  }

  MonthvalueChanged(event: any) {
    this.billManager.allbill(this.bslno2).subscribe(response => {
      this.bill001mb = deserialize<Bill001mb[]>(Bill001mb, response);
      let monthdate = new Date(this.previewMonth.value);
      let MonthDate = this.datepipe.transform(monthdate, 'yyyy-MM-dd');
      if (this.monthlybutton == true) {
        let days = [];
        const weekdays = new Date(MonthDate);
        var dayOfWeek = 31;
        var date = new Date(weekdays);
        var diff = date.getDay() - dayOfWeek;
        if (diff <= 0) {
          let date = (-1) * diff
          for (let i = 0; i < date; i++) {
            days.push(
              moment(MonthDate)
                .add(i, "days")
                .format("DD-MM-YYYY")
            );
          }
        }

        for (let i = 0; i < this.bill001mb.length; i++) {
          for (let j = 0; j < days.length; j++) {
            if (this.bill001mb[i].date === days[j]) {
              this.monthdeatails.push(this.bill001mb[i]);
            }
          }
        }


        if (this.monthdeatails.length > 0) {
          this.gridOptions?.api?.setRowData(this.monthdeatails);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      }
    });
  }



  onClickTab(event: any, value: string) {
    if (value === "Tab-1") {
      this.TabEvent = true;
      this.TabsEvent = false;
    } else {
      this.TabEvent = false;
      this.TabsEvent = true;
    }

  }

  onClick(): void {
    this.router.navigate(['/app-bill-page']);

  }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'slNo',
        field: 'slNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Bill No',
        field: 'billno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Custemer Name',
        field: 'cusname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Contact',
        field: 'mobile',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address',
        field: 'address',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'date',
        field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'veichal Model',
        field: 'veichalmodel',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Reg No',
        field: 'regno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'KMS',
        field: 'kms',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'View',
        cellRenderer: 'iconRenderer',
        width: 60,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onViewButtonClick.bind(this),
          label: 'View',
        },

      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 60,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onPdfButtonClick.bind(this),
          label: 'Delete',
        },
      }
    ]
  }
  onPdfButtonClick(params: any) {
    this.billManager.pdfId(params.rowData.slNo,).subscribe((response) => {
      let date = new Date();
      let newDate = this.datepipe.transform(date, 'dd-MM-yyyy');
      saveAs(response, params.rowData.slNo + "  " + newDate);
    })

  }

  onGeneratePdfReport(event: any, dateForm: any) {
    let date = new Date(this.selectedDate.value);
    let weekdate = new Date(this.previewWeek.value);
    let monthdate = new Date(this.previewMonth.value);

    let dayDate = this.datepipe.transform(date, 'dd-MM-yyyy');
    let WeekDate = this.datepipe.transform(weekdate, 'yyyy-MM-dd');
    let MonthDate = this.datepipe.transform(monthdate, 'yyyy-MM-dd');

    // this.dayvalue = this.dateForm.value.days
    // this.paymetvalue = this.dateForm.value.pmethod
    if (dayDate && this.dayilybutton) {
      this.dayvalue = 'Day';
      this.billManager.InvoicepdfId(dayDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (dayDate && this.weeklybutton) {
      this.dayvalue = 'Week';
      this.billManager.InvoicepdfId(WeekDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (dayDate && this.monthlybutton) {
      this.dayvalue = 'Month';
      this.billManager.InvoicepdfId(MonthDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }


  }

  onGeneratePdfWork(event: any, dateForm: any) {
    let date = new Date(this.selectedDate.value);
    let weekdate = new Date(this.previewWeek.value);
    let monthdate = new Date(this.previewMonth.value);

    let dayDate = this.datepipe.transform(date, 'dd-MM-yyyy');
    let WeekDate = this.datepipe.transform(weekdate, 'yyyy-MM-dd');
    let MonthDate = this.datepipe.transform(monthdate, 'yyyy-MM-dd');
    // this.datevalue = this.dateForm.value.date
    // this.dayvalue = this.dateForm.value.days
    this.paymetvalue = this.dateForm.value.pmethod
    if (dayDate && this.dayilybutton && this.paymetvalue) {
      this.dayvalue = 'Day'
      this.billManager.paymentpdfId(dayDate, this.dayvalue, this.paymetvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (dayDate && this.weeklybutton && this.paymetvalue) {
      this.dayvalue = 'Week'
      this.billManager.paymentpdfId(WeekDate, this.dayvalue, this.paymetvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (dayDate && this.monthlybutton && this.paymetvalue) {
      this.dayvalue = 'Month'
      this.billManager.paymentpdfId(MonthDate, this.dayvalue, this.paymetvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }
    if (dayDate && this.dayilybutton && !this.paymetvalue) {
      this.dayvalue = 'Day'
      this.billManager.datepdfId(dayDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (WeekDate && this.weeklybutton && !this.paymetvalue) {
      this.dayvalue = 'Week'
      this.billManager.datepdfId(WeekDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }

    if (MonthDate && this.monthlybutton && !this.paymetvalue) {
      this.dayvalue = 'Month'
      this.billManager.datepdfId(MonthDate, this.dayvalue).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(this.datevalue, 'dd-MM-yyyy');
        saveAs(response, newDate);
      })
    }
  }

  onViewButtonClick(params: any) {

    const modalRef = this.modalService.open(AmountComponent);
    modalRef.componentInstance.title = "Purchase Order";
    modalRef.componentInstance.details = params.rowData.payment001wbs
  }
  rowClicked(params: any) {
    params.node.setData({
      ...params.data,
      name: true,
    });
  }
  getRowStyle(params) {

    return true;
  }
}
