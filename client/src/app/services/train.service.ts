import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Train } from './train';

@Injectable({
  providedIn: 'root'
})
export class TrainService extends BaseCrudService<Train>{

  constructor(public override http: HttpClient) {
    super(http)
    this.endpoint = 'train'
  }

  train(){
    const url = [this.baseUrl, 'retrain'].join('/')
    return this.http.get<any>(url);
  }

}
