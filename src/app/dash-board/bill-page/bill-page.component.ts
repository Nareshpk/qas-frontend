import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from '../payment/payment.component';
import { DatePipe } from '@angular/common';
import { BillManager } from 'src/app/shared/services/restcontroller/bizservice/bill.service';
import { Bill001mb } from 'src/app/shared/services/restcontroller/entities/bill001mb';
import { Payment001wb } from 'src/app/shared/services/restcontroller/entities/payment001wb';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { subDays } from 'date-fns';
@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss'],
})
export class BillPageComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  bslno2: number;
  billForm?: FormGroup | any;
  slNo: number | any;
  billno: string | any;
  cusname: string;
  mobile: number;
  address: string;
  yesterdayDate = subDays(new Date(), 0);
  date = new FormControl(this.yesterdayDate);
  veichalmodel: string;
  regno: string;
  kms: string;
  waterwash: string;
  wateramount: string;
  teflon: string;
  teflonamount: string;
  interiar: string;
  interiaramount: string;
  painting: string;
  paintingamount: string;
  others: string;
  othersamount: string;
  count = 0;
  purchasereqitem: Payment001wb[] = [];
  totalAmount: any;
  totalamount?: number;
  date3: Date;
  payment: string;
  paymentmethod: any;
  bill001mb: Bill001mb[];
  constructor(
    private formBuilder: FormBuilder,
    private billManager: BillManager,
    // private modalService: NgbModal,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private toast: ToastService,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    };
  }

  ngOnInit(): void {
    this.billForm = this.formBuilder.group({
      billno: [''],
      cusname: [''],
      mobile: ['', Validators.pattern('[6-9]\\d{9}')],
      address: [''],
      date: [''],
      veichalmodel: [''],
      regno: [''],
      kms: [''],
    });
    this.loadData();
    this.createDataGrid001();
  }
  loadData() {
    this.billManager.getCount().subscribe((response) => {
      this.count = response[0].row === 0 ? 1 : parseInt(response[0].row) + 1;
      this.billForm.patchValue({
        billno: String("QAS/") + String(this.count).padStart(4, '0')
      });
    });

    this.billManager.allbill(this.bslno2).subscribe(response => {
      this.bill001mb = deserialize<Bill001mb[]>(Bill001mb, response);
      if (this.bill001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.bill001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() {
    return this.billForm.controls;
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
        headerName: 'Payment Method',
        field: 'payment',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },

    ];
  }
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.purchasereqitem = params.data.payment001wbs;
    // // let WeekDate = this.datepipe.transform(params.data.date, 'MM-dd-yyyy');
    // this.date.value.patchValue(new Date(params.data.date))
    this.totalAmount = params.data.totalamount;
    this.paymentmethod = params.data.payment;
    this.billForm.patchValue({
      billno: params.data.billno,
      cusname: params.data.cusname,
      mobile: params.data.mobile,
      address: params.data.address,
      date: params.data.date,
      veichalmodel: params.data.veichalmodel,
      regno: params.data.regno,
      kms: params.data.kms,
    });

  }
  onAddbuttonClick() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '60%',
      data: {
        arraydata: this.purchasereqitem,
        TAmount: this.totalAmount,
        paymenttype: this.paymentmethod
      }
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      this.purchasereqitem = data.purchasereqitem;
      this.totalAmount = data.totalAmount;
      this.paymentmethod = data.paymentmethod;
    });
  }

  onbillreqClick(event: any, billForm: any) {


    const bill001mb = new Bill001mb();
    bill001mb.billno = this.f.billno.value;
    bill001mb.cusname = this.f.cusname.value;
    bill001mb.mobile = this.f.mobile.value;
    bill001mb.address = this.f.address.value;

    bill001mb.date = this.f.date.value;
    bill001mb.veichalmodel = this.f.veichalmodel.value;
    bill001mb.regno = this.f.regno.value;
    bill001mb.kms = this.f.kms.value;
    bill001mb.totalamount = this.totalAmount.value;
    bill001mb.payment = this.paymentmethod.value;
    bill001mb.payment001wbs = this.purchasereqitem ? this.purchasereqitem : 0;

    if (this.slNo) {
      bill001mb.slNo = this.slNo;
      this.billManager.billupdate(bill001mb).subscribe((response) => {
        this.toast.openSnackBar('Invoice Update Successfully');
        this.billForm.reset();
        this.purchasereqitem = [];
        this.billForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });

    } else {
      console.log("save----------->>", bill001mb);
      this.billManager.billsave(bill001mb).subscribe((response) => {
        this.toast.openSnackBar('Invoice Saved Successfully');
        this.billForm.reset();
        this.purchasereqitem = [];
        this.loadData();
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.billForm.controls.billno.reset();
    this.billForm.controls.cusname.reset();
    this.billForm.controls.mobile.reset();
    this.billForm.controls.date.reset();
    this.billForm.controls.veichalmodel.reset();
    this.billForm.controls.regno.reset();
    this.billForm.controls.kms.reset();
    this.billForm.controls.payment.reset();
    this.billForm.controls.payment001wbs.reset();
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
