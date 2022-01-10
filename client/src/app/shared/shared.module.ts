import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list'
import { MatSortModule } from '@angular/material/sort'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ConfirmDialogComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    NgSelectModule,
  ],
})
export class SharedModule { }
