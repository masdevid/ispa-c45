import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HelpersService } from 'src/app/services/helpers.service';
import { KategoriUsia } from 'src/app/services/kategori-usia';

import { Pasien } from 'src/app/services/pasien';
import { PasienService } from 'src/app/services/pasien.service';
import { BaseActionComponent } from 'src/app/shared/base-action';
import { SatuanUsia } from '../../kategori-usia/kategori-usia-action/kategori-usia-action.component';
export const Bulan = [
  {
    id: 1,
    name: 'Januari'
  },
  {
    id: 2,
    name: 'Februari'
  },
  {
    id: 3,
    name: 'Maret'
  },
  {
    id: 4,
    name: 'April'
  },{
    id: 5,
    name: 'Mei'
  },
  {
    id: 6,
    name: 'Juni'
  },
  {
    id: 7,
    name: 'Juli'
  },
  {
    id: 8,
    name: 'Agustus'
  },{
    id: 9,
    name: 'September'
  },
  {
    id: 10,
    name: 'Oktober'
  },
  {
    id: 11,
    name: 'Nopember'
  },
  {
    id: 12,
    name: 'Desember'
  }

]
@Component({
  selector: 'app-training-action',
  templateUrl: './training-action.component.html',
  styleUrls: ['./training-action.component.scss']
})
export class TrainingActionComponent extends BaseActionComponent<Pasien> implements OnInit, OnDestroy {
  satuanUsia = SatuanUsia;
  kategoriUsia: KategoriUsia[] = []
  bulan = Bulan;

  constructor(
    public router:         Router,
    public activatedRoute: ActivatedRoute,
    public helpers:        HelpersService,
    public service:        PasienService,
    public fb:             FormBuilder,
    public sb: MatSnackBar
    ) {
      super(router, activatedRoute, helpers, service, fb, sb);
      this.dataSource   = this.activatedRoute.snapshot.data['currentData'];
      this.kategoriUsia = this.activatedRoute.snapshot.data['kategoriUsia']
      this.redirectTo   = '/training'
      this.subject      = 'nama';
      this.createForm();
    }
    ngOnInit(): void {
      super.ngOnInit();
      const usia = this.form.get('umur')?.valueChanges
      const satuan = this.form.get('satuan_umur')?.valueChanges
      combineLatest({usia, satuan}).subscribe(({usia, satuan}) => {
          const kategori = this.kategoriUsia.filter(u => usia >= u.min && usia <= u.max && satuan == u.satuan )
          if (kategori.length){
            this.form.get('kategori_usia')?.setValue(kategori[0].id)
          }
      })
    }

    ngOnDestroy(): void {
      super.ngOnDestroy();
    }
    afterSetForm(): void {
    }
    defaultForm() {
      return {
        nama:     [null, [Validators.required]],
        alamat:     [null, [Validators.required]],
        jenis_kelamin: [null, [Validators.required]],
        umur:     [null, [Validators.required]],
        satuan_umur:     [null, [Validators.required]],
        suhu:     [null, [Validators.required]],
        is_data_training:     [true, []],
        is_sesak: [null, [Validators.required]],
        is_batuk: [null, [Validators.required]],
        kategori_usia: [null, [Validators.required]],
        result:[null, [Validators.required]],
        tahun: [null, [Validators.required]],
        bulan: [null, [Validators.required]]
      }
    }
  }
