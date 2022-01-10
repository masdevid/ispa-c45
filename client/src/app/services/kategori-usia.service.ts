import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { KategoriUsia } from './kategori-usia';

@Injectable({
  providedIn: 'root'
})
export class KategoriUsiaService extends BaseCrudService<KategoriUsia>{

  constructor(public override http: HttpClient) {
    super(http)
    this.endpoint = 'kategori-usia'
  }

}
