import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeeManager } from 'src/app/shared/services/restcontroller/bizservice/Employee.service';
import { SalaryManager } from 'src/app/shared/services/restcontroller/bizservice/salary.service';
import { WorkMehodManager } from 'src/app/shared/services/restcontroller/bizservice/workmehtod.service';
import { Employee001mb } from 'src/app/shared/services/restcontroller/entities/Employee001mb';
import { Salary001mb } from 'src/app/shared/services/restcontroller/entities/Salary001mb';
import { Workmethod001mb } from 'src/app/shared/services/restcontroller/entities/Workmethod001mb';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private employeeeManager: EmployeeeManager,
  ) { }

  ngOnInit(): void {
  }

}
