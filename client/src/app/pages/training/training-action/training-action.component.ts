import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';
import { Pasien } from 'src/app/services/pasien';
import { PasienService } from 'src/app/services/pasien.service';
import { BaseActionComponent } from 'src/app/shared/base-action';
import { SatuanUsia } from '../../kategori-usia/kategori-usia-action/kategori-usia-action.component';

@Component({
  selector: 'app-training-action',
  templateUrl: './training-action.component.html',
  styleUrls: ['./training-action.component.scss']
})
export class TrainingActionComponent extends BaseActionComponent<Pasien> implements OnInit, OnDestroy {
  satuanUsia = SatuanUsia;
  kategoriUsia: KategoriUsia[] = []

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
        result:[null, [Validators.required]]
      }
    }
  }
