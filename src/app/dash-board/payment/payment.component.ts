import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { WorkMehodManager } from 'src/app/shared/services/restcontroller/bizservice/workmehtod.service';
import { Workmethod001mb } from 'src/app/shared/services/restcontroller/entities/Workmethod001mb';
import { Bill001mb } from 'src/app/shared/services/restcontroller/entities/bill001mb';
import { Payment001wb } from 'src/app/shared/services/restcontroller/entities/payment001wb';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() purchasereqitem: any;
  purchasereqForm: FormGroup | any;
  purchasereqFormArry: FormArray | any;
  slNo?: number;
  bslno?: number;
  workmethod?: string;
  amount?: number;
  bslno2?: Bill001mb;
  payment001wbs: Payment001wb[] = [];
  totalamount = 0;
  workmethod001mb: Workmethod001mb[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { arraydata: any, TAmount: any, paymenttype: any },
    private formBuilder: FormBuilder,
    private workMehodManager: WorkMehodManager,
    private dialogRef: MatDialogRef<PaymentComponent>,
  ) { }

  ngOnInit(): void {
    this.purchasereqForm = this.formBuilder.group({
      tamount: [''],
      pmethod: [''],
      purchasereqFormArry: this.formBuilder.array([this.createItem()])
    });
    this.loadData();
    console.log("this.data.arraydata",this.data.arraydata);

    this.purchasereqForm.controls['tamount'].setValue(this.data.TAmount);
    this.purchasereqForm.controls['pmethod'].setValue(this.data.paymenttype);
    // this.purchasereqForm.controls[z].controls['workmethod'].setValue(this.data[z].workmethod);
    for (let z = 0; z < this.data.arraydata?.length; z++) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      if (z < (this.data.arraydata?.length) - 1) {
        this.purchasereqFormArry.push(this.createItem());
      }
      this.slNo = this.data.arraydata[z].slNo;
      this.purchasereqFormArry.controls[z].controls['workmethod'].setValue(this.data.arraydata[z].workmethod);
      this.purchasereqFormArry.controls[z].controls['amount'].setValue(this.data.arraydata[z].amount);
    }

  }

  loadData() {
    this.workMehodManager.workall().subscribe(response => {
      this.workmethod001mb = deserialize<Workmethod001mb[]>(Workmethod001mb, response);

    });
  }

  createItem() {
    return this.formBuilder.group({
      bslno: [''],
      workmethod: [''],
      amount: [''],
    });
  }

  addItem() {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }

  onChange(event: any, i: any) {
    this.totalamount = 0
    this.purchasereqFormArry.value.forEach(time => {
      this.totalamount = this.totalamount + parseInt(time.amount);
    })
    this.purchasereqForm.controls['tamount'].setValue(this.totalamount);
  }

  get f() {
    return this.purchasereqForm.controls;
  }

  onOkClick(event: any, purchasereqForm: any) {
    let payment001wbs: Payment001wb[] = [];
    for (let i = 0; i < this.purchasereqForm.controls.purchasereqFormArry.controls.length; i++) {
      let payment001wb = new Payment001wb();
      if (this.slNo) {
        payment001wb.slNo = this.data.arraydata[i].slNo;
        // payment001wb.workmethod = this.f.purchasereqFormArry.value[i].workmethod ? this.f.purchasereqFormArry.value[i].workmethod : null;
        // payment001wb.amount = this.f.purchasereqFormArry.value[i].amount ? this.f.purchasereqFormArry.value[i].amount : "";
        payment001wbs.push(payment001wb);
      } else {
        // payment001wb.workmethod = this.f.purchasereqFormArry.value[i].workmethod ? this.f.purchasereqFormArry.value[i].workmethod : null;
        // payment001wb.amount = this.f.purchasereqFormArry.value[i].amount ? this.f.purchasereqFormArry.value[i].amount : "";
        payment001wbs.push(payment001wb);
      }
      console.log("payment001wbs--------->>", payment001wbs);

    }
    this.dialogRef.close({
      purchasereqitem: payment001wbs,
      totalAmount: this.f.tamount,
      paymentmethod: this.f.pmethod
    });
  }

}
