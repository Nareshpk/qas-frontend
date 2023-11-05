import { Component, OnInit } from '@angular/core';
import { SalaryManager } from 'src/app/shared/services/restcontroller/bizservice/salary.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Salary001mb } from 'src/app/shared/services/restcontroller/entities/Salary001mb';
import { GridOptions } from 'ag-grid-community';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';
import { deserialize } from 'serializer.ts/Serializer';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  salaryaddForm: FormGroup | any;
  employename?: string;
  employesalary?: string;
  employeslarydate?: string;
  salary001mb: Salary001mb | any;

  constructor(
    private formBuilder: FormBuilder,
    private salaryManager: SalaryManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    };
  }

  ngOnInit(): void {
    this.salaryaddForm = this.formBuilder.group({
      employename: [''],
      employesalary: [''],
      employeslarydate: [''],
    });
    this.loadData();
    this.createDataGrid001();
  }

  loadData() {
    this.salaryManager.salaryall().subscribe(response => {
      this.salary001mb = deserialize<Salary001mb[]>(Salary001mb, response);
      if (this.salary001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.salary001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get j() {
    return this.salaryaddForm.controls;
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

  salaryaddFormClick(event: any, salaryaddForm: any) {

    const salary001mb = new Salary001mb();
    salary001mb.employename = this.j.employename.value;
    salary001mb.employesalary = this.j.employesalary.value;
    salary001mb.employeslarydate = this.j.employeslarydate.value;

    this.salaryManager.salarysave(salary001mb).subscribe((response) => {
      this.salaryaddForm.reset();
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
    this.salaryaddForm.reset();
  }
}
