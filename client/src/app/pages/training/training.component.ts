import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { Pasien } from 'src/app/services/pasien';
import { PasienService } from 'src/app/services/pasien.service';
import { Train } from 'src/app/services/train';
import { TrainService } from 'src/app/services/train.service';
import { BasePage } from 'src/app/shared/base-page';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent extends BasePage<Pasien> implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public service: PasienService, public router: Router, public activatedRoute: ActivatedRoute, public sb: MatSnackBar, public dialog: MatDialog, public helpers: HelpersService, private trainService: TrainService) {
    super(service, router, activatedRoute, sb, dialog, helpers)
    this.title = 'Data Test'
    this.primaryKey       = 'id';
    this.sortActive       = 'nama';
    this.sortDirection    = 'asc';
    this.subject          = 'nama';
    const selectedFields  = 'tahun,bulan,nama,alamat,jenis_kelamin,umur,satuan_umur,suhu,is_sesak,is_batuk,result';
    this.displayedColumns = ['select', 'no', ...selectedFields.split(',').filter(f => f != 'id'), 'actions'];
    this.q.limit = 10;
    this.q.filter = { is_data_training: 1}
  }
  train_logs: Train[] = []

  ngOnInit(): void {
    super.ngOnInit()
    this.getTrains()
  }
  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
  train(){
    this.trainService.train().subscribe(() => {
      this.getTrains()
    })
  }
  getTrains(){
    this.trainService.getAll({limit:0, offset:0, sort:'-timestamp'}).subscribe((resp) => {
      this.train_logs = resp;
    })
  }
}
