import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HelpersService } from 'src/app/services/helpers.service';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { PasienService } from 'src/app/services/pasien.service';
import { TestingService } from 'src/app/services/testing.service';
import { TrainService } from 'src/app/services/train.service';
import { SatuanUsia } from '../kategori-usia/kategori-usia-action/kategori-usia-action.component';
import { Bulan } from '../training/training-action/training-action.component';

export interface PredictResult{

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  satuanUsia = SatuanUsia;
  kategoriUsia: KategoriUsia[] = []
  constructor(private fb: FormBuilder, private sb: MatSnackBar, private activatedRoute: ActivatedRoute, private testingService: TestingService, private pasienService: PasienService) {
    this.kategoriUsia = this.activatedRoute.snapshot.data['kategoriUsia']
  }
  isLoading = false;
  result: any;
  trendResult: any;
  bulan = Bulan;
  form: FormGroup;
  counter = {
    kategori: 0,
    training: 0,
  }
  formTrend: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      nama:     [null, [Validators.required]],
      alamat:     [null, [Validators.required]],
      jenis_kelamin: [null, [Validators.required]],
      umur:     [null, [Validators.required]],
      satuan_umur:     [null, [Validators.required]],
      suhu:     [null, [Validators.required]],
      is_data_training:     [false, []],
      is_sesak: [null, [Validators.required]],
      is_batuk: [null, [Validators.required]],
      kategori_usia: [null, [Validators.required]],
      tahun: [null, [Validators.required]],
      bulan: [null, [Validators.required]],
    });
    this.formTrend = this.fb.group({
      tahun: [null, [Validators.required]],
      bulan: [null, [Validators.required]],
    })
    this.getTraning()
    this.getKategori()
    const usia = this.form.get('umur')?.valueChanges
    const satuan = this.form.get('satuan_umur')?.valueChanges
    combineLatest({usia, satuan}).subscribe(({usia, satuan}) => {
      const kategori = this.kategoriUsia.filter(u => usia >= u.min && usia <= u.max && satuan == u.satuan )
      if (kategori.length){
        this.form.get('kategori_usia')?.setValue(kategori[0].id)
      }
    })
  }

  parseInt(num: string){
    return parseInt(num)
  }
  getTraning(){
    this.pasienService.count({ filter:{is_data_training: 1}}).subscribe((resp)=>{
      this.counter.training = resp.count;
    })
  }

  getKategori(){
    this.counter.kategori = this.kategoriUsia.length
  }
  predict(){
    this.result = null
    this.isLoading = true;
    this.testingService.predict(this.form.value).subscribe({
      next:(resp) => {
        this.isLoading = false
        this.result = resp;
      },
      error:() => {
        this.isLoading = false
      }
    })
  }
  prediksiTrend(){
    this.trendResult = null
    this.isLoading = true;
    this.testingService.predictTrend(this.formTrend.value).subscribe({
      next:(resp) => {
        this.isLoading = false
        this.trendResult = resp;
      },
      error:(err) => {
        this.isLoading = false
        this.sb.open(err.error.message, null, {duration: 4000})
      }
    })
  }
}
