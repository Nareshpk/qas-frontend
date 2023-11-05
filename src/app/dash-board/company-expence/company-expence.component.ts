import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { ExpensesManager } from 'src/app/shared/services/restcontroller/bizservice/expenses.service';
import { Expenses001mb } from 'src/app/shared/services/restcontroller/entities/Expenses001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';

@Component({
  selector: 'app-company-expence',
  templateUrl: './company-expence.component.html',
  styleUrls: ['./company-expence.component.scss']
})
export class CompanyExpenceComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  expensesForm: FormGroup | any;
  expensesdate: any;
  expensesamount: any;
  expensesname: any;
  expenses001mb: Expenses001mb | any;
  constructor(
    private formBuilder: FormBuilder,
    private expensesManager: ExpensesManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    };
  }

  ngOnInit(): void {
    this.expensesForm = this.formBuilder.group({
      expensesname: [''],
      expensesamount: [''],
      expensesdate: [''],
    });

    this.loadData();
    this.createDataGrid001();
  }

  loadData() {
    this.expensesManager.expensesall().subscribe(response => {
      this.expenses001mb = deserialize<Expenses001mb[]>(Expenses001mb, response);
      if (this.expenses001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.expenses001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() {
    return this.expensesForm.controls;
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
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          // onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },

    ];
  }

  expensesFormClick(event: any, expensesForm: any) {
    const expenses001mb = new Expenses001mb();
    expenses001mb.expensesname = this.f.expensesname.value;
    expenses001mb.expensesamount = this.f.expensesamount.value;
    expenses001mb.expensesdate = this.f.expensesdate.value;

    this.expensesManager.expensessave(expenses001mb).subscribe((response) => {
      this.expensesForm.reset();
      this.loadData();
      // this.calloutService.showSuccess('Purchase Request Saved Successfully');
      // this.purchasereqForm.reset();
      // this.purchasereqitem = [];
      // this.purchasereqForm.patchValue({
      //   date: this.datepipe.transform(new Date(), 'dd-MM-yyyy'),
      // });

      // this.submitted = false;
    });
  }

  onReset() {
    this.expensesForm.reset();
  }
}
