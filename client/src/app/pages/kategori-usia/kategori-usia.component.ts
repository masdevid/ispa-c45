import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';
import { BasePage } from 'src/app/shared/base-page';

@Component({
  selector: 'app-kategori-usia',
  templateUrl: './kategori-usia.component.html',
  styleUrls: ['./kategori-usia.component.scss']
})
export class KategoriUsiaComponent extends BasePage<KategoriUsia> implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public service: KategoriUsiaService, public router: Router, public activatedRoute: ActivatedRoute, public sb: MatSnackBar, public dialog: MatDialog, public helpers: HelpersService) {
    super(service, router, activatedRoute, sb, dialog, helpers)
    this.title = 'Kategori Usia'
    this.primaryKey       = 'id';
    this.sortActive       = 'kategori';
    this.sortDirection    = 'asc';
    this.subject          = 'kategori';
    const selectedFields  = 'kategori,min,max,satuan';
    this.displayedColumns = ['select', 'no', ...selectedFields.split(',').filter(f => f != 'id'), 'actions'];
  }

  ngOnInit(): void {
    super.ngOnInit()
  }
  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
}
