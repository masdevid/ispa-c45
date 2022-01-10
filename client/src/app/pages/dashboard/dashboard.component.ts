import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { PasienService } from 'src/app/services/pasien.service';
import { TestingService } from 'src/app/services/testing.service';
import { TrainService } from 'src/app/services/train.service';
import { SatuanUsia } from '../kategori-usia/kategori-usia-action/kategori-usia-action.component';

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
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private trainingService: TrainService, private testingService: TestingService, private pasienService: PasienService) {
    this.kategoriUsia = this.activatedRoute.snapshot.data['kategoriUsia']
  }
  isLoading = false;
  result: any;
  form: FormGroup;
  counter = {
    kategori: 0,
    training: 0,
  }
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
    });
    this.getTraning()
    this.getKategori()
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
}
