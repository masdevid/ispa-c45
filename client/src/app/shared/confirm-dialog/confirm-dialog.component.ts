import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  public confirmMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialog : MatDialogRef<ConfirmDialogComponent>
  ) { }

}
