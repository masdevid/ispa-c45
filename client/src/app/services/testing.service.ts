import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Testing } from './testing';

@Injectable({
  providedIn: 'root'
})
export class TestingService  extends BaseCrudService<Testing>{

  constructor(public override http: HttpClient) {
    super(http)
    this.endpoint = 'testing'
  }
  predict(data){
    const url = [this.baseUrl, 'predict'].join('/')
    return this.http.post<any>(url, data);
  }
}
