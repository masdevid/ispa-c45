import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { Pasien } from 'src/app/services/pasien';
import { PasienService } from 'src/app/services/pasien.service';
import { BasePage } from 'src/app/shared/base-page';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent extends BasePage<Pasien> implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public service: PasienService, public router: Router, public activatedRoute: ActivatedRoute, public sb: MatSnackBar, public dialog: MatDialog, public helpers: HelpersService) {
    super(service, router, activatedRoute, sb, dialog, helpers)
    this.title = 'Data Training'
    this.primaryKey       = 'id';
    this.sortActive       = 'id';
    this.sortDirection    = 'desc';
    this.subject          = 'nama';
    const selectedFields  = 'tahun,bulan,nama,alamat,jenis_kelamin,umur,satuan_umur,suhu,is_sesak,is_batuk,result';
    this.displayedColumns = ['select', 'no', ...selectedFields.split(',').filter(f => f != 'id'), 'actions'];
    this.q.filter = { is_data_training: 0}
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
  setTrain(id){
    this.service.setTrain(id).subscribe(() => {
      this.getData()
    })
  }
}
