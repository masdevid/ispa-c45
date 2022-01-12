import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Pasien } from './pasien';

@Injectable({
  providedIn: 'root'
})
export class PasienService extends BaseCrudService<Pasien>{

  constructor(public override http: HttpClient) {
    super(http)
    this.endpoint = 'pasien'
  }
  setTrain(id){
    const url = [this.baseUrl, this.endpoint,'set-train', id].join('/')
    return this.http.put<Pasien>(url, {})
  }
}
