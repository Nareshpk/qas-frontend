import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  @Input() details: any;
  amountdtails: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<AmountComponent>,
  ) { }

  ngOnInit(): void {
    this.amountdtails = this.data;
  }

  OnClick() {
    this.dialogRef.close()
  }
}
