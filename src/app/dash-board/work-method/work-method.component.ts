import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { WorkMehodManager } from 'src/app/shared/services/restcontroller/bizservice/workmehtod.service';
import { Workmethod001mb } from 'src/app/shared/services/restcontroller/entities/Workmethod001mb';
import { TotalValueRenderer } from 'src/app/shared/services/total-value-component';

@Component({
  selector: 'app-work-method',
  templateUrl: './work-method.component.html',
  styleUrls: ['./work-method.component.scss']
})
export class WorkMethodComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  workaddForm: FormGroup | any;
  slNo: number | any;
  worktype?: string;
  workmethod001mb: Workmethod001mb | any;
  constructor(
    private formBuilder: FormBuilder,
    private workMehodManager: WorkMehodManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: TotalValueRenderer
    };
  }

  ngOnInit(): void {

    this.workaddForm = this.formBuilder.group({
      worktype: [''],
    });
    this.loadData();
    this.createDataGrid001();
  }

  loadData() {
    this.workMehodManager.workall().subscribe(response => {
      this.workmethod001mb = deserialize<Workmethod001mb[]>(Workmethod001mb, response);
      if (this.workmethod001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.workmethod001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() {
    return this.workaddForm.controls;
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
        headerName: 'Work Type',
        field: 'worktype',
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
    this.workaddForm.patchValue({
      "worktype": params.data.worktype,
    });
  }
  workaddFormClick(event: any, workaddForm: any) {

    let workmethod001mb = new Workmethod001mb();
    workmethod001mb.worktype = this.f.worktype.value;
    if (this.slNo) {
      workmethod001mb.slNo = this.slNo;
      this.workMehodManager.workupdate(workmethod001mb).subscribe((response) => {
        this.workaddForm.reset();
        this.loadData();
      });
    } else {
      this.workMehodManager.worksave(workmethod001mb).subscribe((response) => {
        this.workaddForm.reset();
        this.loadData();
      });
    }

  }
  onReset() {
    this.workaddForm.reset();
  }

}
