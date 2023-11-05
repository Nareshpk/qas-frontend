import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { BillManager } from 'src/app/shared/services/restcontroller/bizservice/bill.service';
import { ExpensesManager } from 'src/app/shared/services/restcontroller/bizservice/expenses.service';
import { SalaryManager } from 'src/app/shared/services/restcontroller/bizservice/salary.service';
import { Expenses001mb } from 'src/app/shared/services/restcontroller/entities/Expenses001mb';
import { Salary001mb } from 'src/app/shared/services/restcontroller/entities/Salary001mb';
import { Bill001mb } from 'src/app/shared/services/restcontroller/entities/bill001mb';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';
import { ExcelsheetManager } from 'src/app/shared/services/restcontroller/bizservice/Excelsheet.service';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-audit-deatail',
  templateUrl: './audit-deatail.component.html',
  styleUrls: ['./audit-deatail.component.scss']
})
export class AuditDeatailComponent implements OnInit {
  public gridOptions: GridOptions | any;
  public gridOptions1: GridOptions | any;
  public gridOptions2: GridOptions | any;

  downloadExcelForm: FormGroup | any

  frameworkComponents: any;
  bill001mb: Bill001mb[];
  bslno2: number;
  expenses001mb: Expenses001mb[] | any;
  salary001mb: Salary001mb[] | any;
  userRole: any;

  constructor(
    private billManager: BillManager,
    private expensesManager: ExpensesManager,
    private salaryManager: SalaryManager,
    private excelsheetManager: ExcelsheetManager,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private calloutService: CalloutService,
    private authManager: AuthManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    }
  }

  ngOnInit(): void {
    this.userRole = this.authManager.getcurrentUser?.role?.rolename;
    console.log(" this.username", this.userRole);

    this.downloadExcelForm = this.formBuilder.group({
      startdate: [null],
      enddate: [null]
    })
    this.loadData();
    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();
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

    this.expensesManager.expensesall().subscribe(response => {
      this.expenses001mb = deserialize<Expenses001mb[]>(Expenses001mb, response);
      if (this.expenses001mb.length > 0) {
        this.gridOptions1?.api?.setRowData(this.expenses001mb);
      } else {
        this.gridOptions1?.api?.setRowData([]);
      }
    });

    this.salaryManager.salaryall().subscribe(response => {
      this.salary001mb = deserialize<Salary001mb[]>(Salary001mb, response);
      if (this.salary001mb.length > 0) {
        this.gridOptions2?.api?.setRowData(this.salary001mb);
      } else {
        this.gridOptions2?.api?.setRowData([]);
      }
    });
  }

  get f() {
    return this.downloadExcelForm.controls;
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
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
    ]
  }

  createDataGrid002(): void {
    this.gridOptions1 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions1.editType = 'fullRow';
    this.gridOptions1.enableRangeSelection = true;
    this.gridOptions1.animateRows = true;
    this.gridOptions1.columnDefs = [
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
        headerName: 'Expenses Name',
        field: 'expensesname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Expenses Amount',
        field: 'expensesamount',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Expenses Date',
        field: 'expensesdate',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onexpensesdateDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
    ];
  }


  createDataGrid003(): void {
    this.gridOptions2 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions2.editType = 'fullRow';
    this.gridOptions2.enableRangeSelection = true;
    this.gridOptions2.animateRows = true;
    this.gridOptions2.columnDefs = [
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
        headerName: 'Employee Name',
        field: 'employename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Salary Amount',
        field: 'employesalary',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Salary Date',
        field: 'employeslarydate',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onSalaryDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
    ];
  }

  onDeleteButtonClick(params: any) {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '30%',
      data: params.data.payment001wbs
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'Yes') {
        this.billManager.billdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.bill001mb.length; i++) {
            if (this.bill001mb[i].slNo == params.data.slNo) {
              this.bill001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Sales Order Removed Successfully");
        });
      }
    })
  }

  onexpensesdateDeleteButtonClick(params: any) {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '30%',
      data: params.data.payment001wbs
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'Yes') {
        this.expensesManager.expensesdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.expenses001mb.length; i++) {
            if (this.expenses001mb[i].slNo == params.data.slNo) {
              this.expenses001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Sales Order Removed Successfully");
        });
      }
    })
  }

  onSalaryDeleteButtonClick(params: any) {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '30%',
      data: params.data.payment001wbs
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'Yes') {
        this.salaryManager.salarydelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.salary001mb.length; i++) {
            if (this.salary001mb[i].slNo == params.data.slNo) {
              this.salary001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Sales Order Removed Successfully");
        });
      }
    })
  }


  downloadExcel(event: any, downloadExcelForm: any) {

    let startdate = this.datepipe.transform(this.f.startdate.value, 'yyyy-MM-dd');
    let enddate = this.datepipe.transform(this.f.enddate.value, 'yyyy-MM-dd');
    console.log("startdate", startdate);
    console.log("enddate", enddate);

    this.excelsheetManager.downExcel(startdate, enddate).subscribe((response) => {
      let date = new Date();
      let newdate = this.datepipe.transform(date, 'dd-MM-yyyy');
      saveAs(response, "AudtiInvoice" + newdate);
    })
  }

}
