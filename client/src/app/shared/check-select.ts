import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from '@angular/cdk/collections';

export class CheckSelect <T>{
  source: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  selection: SelectionModel<T> = new SelectionModel<T>(true, []);
  constructor(source: MatTableDataSource<T>, selection: SelectionModel<T>) {
    this.source = source;
    this.selection = selection;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    if (!this.source) { return false; }
    const numSelected = this.selection.selected.length;
    const numRows = this.source.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.source.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: T, index: number): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index+1}`;
  }
}