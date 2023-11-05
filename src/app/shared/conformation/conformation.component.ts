import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.scss']
})
export class ConformationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ConformationComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCansel() {
    this.dialogRef.close()
  }
  onClose() {
    this.dialogRef.close("Yes")
  }

}
