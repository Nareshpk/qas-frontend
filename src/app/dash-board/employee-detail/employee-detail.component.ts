import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeeManager } from 'src/app/shared/services/restcontroller/bizservice/Employee.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee001mb } from 'src/app/shared/services/restcontroller/entities/Employee001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { GridOptions } from 'ag-grid-community';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  employeeaddForm: FormGroup | any;
  workmethod: any;
  employeedetail: any;
  employeesalary: any;
  ename?: string;
  econtect?: string;
  eadrress?: string;
  edob?: string;
  ejoin?: string;
  employee001mb?: Employee001mb | any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private employeeeManager: EmployeeeManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    };
  }

  ngOnInit(): void {
    this.employeeaddForm = this.formBuilder.group({
      ename: [''],
      econtect: [''],
      eadrress: [''],
      edob: [''],
      ejoin: [''],
    });
    this.loadData();
    this.createDataGrid001();
  }

  loadData() {
    this.employeeeManager.employeeall().subscribe(response => {
      this.employee001mb = deserialize<Employee001mb[]>(Employee001mb, response);
      if (this.employee001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.employee001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get k() {
    return this.employeeaddForm.controls;
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
        field: 'ename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Employee Amount',
        field: 'econtect',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Employee Address',
        field: 'eadrress',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date of Birth',
        field: 'edob',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Join Date',
        field: 'ejoin',
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

  employeeaddFormClick(event: any, employeeaddForm: any) {

    // tslint:disable-next-line:prefer-const
    let employee001mb = new Employee001mb();
    employee001mb.ename = this.k.ename.value;
    employee001mb.econtect = this.k.econtect.value;
    employee001mb.eadrress = this.k.eadrress.value;
    employee001mb.edob = this.k.edob.value;
    employee001mb.ejoin = this.k.ejoin.value;
    this.employeeeManager.employeesave(employee001mb).subscribe((response) => {
      this.employeeaddForm.reset();
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
    this.employeeaddForm.reset();
  }

}
