import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';
import { BaseActionComponent } from 'src/app/shared/base-action';
export const SatuanUsia = [
    {
      name: 'Hari',
      value: 'hr'
    },
    {
      name: 'Bulan',
      value: 'bln'
    },
    {
      name: 'Tahun',
      value: 'th'
    }
  ]

@Component({
  selector: 'app-kategori-usia-action',
  templateUrl: './kategori-usia-action.component.html',
  styleUrls: ['./kategori-usia-action.component.scss']
})
export class KategoriUsiaActionComponent extends BaseActionComponent<KategoriUsia> implements OnInit, OnDestroy {

  satuanUsia = SatuanUsia;
  constructor(
    public router:         Router,
    public activatedRoute: ActivatedRoute,
    public helpers:        HelpersService,
    public service:        KategoriUsiaService,
    public fb:             FormBuilder,
    public sb: MatSnackBar
    ) {
      super(router, activatedRoute, helpers, service, fb, sb);
      this.dataSource   = this.activatedRoute.snapshot.data['currentData'];
      this.redirectTo   = '/kategori-usia'
      this.subject      = 'kategori';
      this.createForm();
    }
    ngOnInit(): void {
      super.ngOnInit();
    }

    ngOnDestroy(): void {
      super.ngOnDestroy();
    }

    defaultForm() {
      return {
        kategori:     [null, [Validators.required]],
        min:     [null, [Validators.required]],
        max:     [null, [Validators.required]],
        satuan:     [null, [Validators.required]],
      }
    }
  }
