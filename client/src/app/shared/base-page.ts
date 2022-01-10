import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subject, Subscription, takeUntil } from "rxjs";
import { BaseCrudService } from "../services/base-crud.service";
import { HelpersService } from "../services/helpers.service";
import { HttpQueries } from "../services/http-queries";
import { CheckSelect } from "./check-select";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-base-page',
  template: ``,
})
export class BasePage<T> implements OnInit{
  constructor(public service: BaseCrudService<T>, public router: Router, public activatedRoute: ActivatedRoute, public sb: MatSnackBar, public dialog: MatDialog, public helpers: HelpersService){
    this.selection = new SelectionModel<T>(true, []);
    this.select = new CheckSelect(this.data, this.selection);
    this.data = new MatTableDataSource<T>([]);
    this.q = { offset: this.offset, limit: this.limit };
  }

  title: string;
  addBtnLabel = 'Tambah';
  data: MatTableDataSource<T>;
  dataLength = 0;
  displayedColumns: string[] = [];
  primaryKey!: string;
  sortActive!: string;
  sortDirection = 'asc';
  subject!: string;
  selection: SelectionModel<T>;
  select!: CheckSelect<T>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginationSub = new Subscription();
  unsubs = new Subject();
  pageSizeOption = [1, 5, 10, 20, 50, 100]
  limit = 10;
  offset = 0;
  q: HttpQueries;

  ngOnInit(): void {
    setTimeout(() => {
      this.getData()
    }, 300);
  }
  getData(){
    this.service.getAll(this.q).subscribe(data => {
      this.data = new MatTableDataSource(data);
    })
    this.service.count({ filter: this.q.filter}).subscribe(data => {
      this.dataLength = data.count;
    })
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe((sort) => {
        this.onSortChange(sort);
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubs.next('');
    this.unsubs.complete();
    if (this.paginationSub) { this.paginationSub.unsubscribe(); }
    this.select.selection.clear();
  }

  onPageChange(page: PageEvent): void {
    const { pageSize, pageIndex } = page;
    this.q.limit = pageSize;
    this.q.offset = pageIndex + 1;
    console.log(this.q);

    this.getData()
  }

  onSortChange(sort: Sort): void {
    const { active, direction } = sort
    this.sortActive = active;
    this.sortDirection = direction;
    this.q.sort = this.helpers.parseSort(active, direction);
    console.log(this.q);

    this.getData()
  }

  add(): void {
    this.router?.navigate(['./action'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        m: 'add',
      },
    });
  }
  edit(data: T | any): void {
    this.router?.navigate(['./action'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        m: 'edit',
        id: data[this.primaryKey],
      },
      state: {
        data
      }
    });
  }
  transformSubject(data: any): string {
    return `${data[this.subject]}`;
  }
  remove(data: T | any): void {
    this.dialog?.open(ConfirmDialogComponent, {
      width: '400px',
      data: {message: data[this.subject]}
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.service
        .removeById(data[this.primaryKey])
        .subscribe(
          {
            next: () => {
              this.afterRemove()
              this.sb.open(`${this.deleteMessage()}`);
            },
            error: (err) => {
              this.afterRemove()
              this.sb.open(err.error.message);
            }
          })
        }
      });
    }
    deleteMessage(): string {
      return 'deleted';
    }
    afterRemove(): void {
      // custom function after remove event
      this.getData()
      this.select.selection.clear(); // Important!
    }
    deleteSelected(selected: T[]): void {
      if (selected.length > 0) {
        this.dialog?.open(ConfirmDialogComponent, {
          width: '400px',
          data: {selected: selected.length}
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            const deleted = selected.map((i: any) => {
              return this.service.removeById(i[this.primaryKey]);
            });
            forkJoin(deleted)
            .pipe(takeUntil(this.unsubs))
            .subscribe(
              {
                next: () => {
                  this.afterRemove();
                  this.sb.open(`${selected.length} data ${this.deleteMessage()}`);
                },
                error: (err) => {
                  this.afterRemove();
                  this.sb.open(err.error.message);
                }
              }
              );
            }
          });
        }
      }
      parseNo(i: number){
        return this.q.offset && this.q.limit ? i + 1 + ((this.q.offset -1) * this.q.limit) : i + 1
      }
    }

