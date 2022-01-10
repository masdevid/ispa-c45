import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from './base-api.service';
import { HttpQueries } from './http-queries';

export interface Count {
  count: number;
}
@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<T> extends BaseApiService {

  constructor(public override http: HttpClient) {
    super(http);
  }
  resolve(): Observable<any> | Promise<any> | any {
    return this.getAll({
      limit: 0,
      offset: 0
    })
  }
  getAll(query: HttpQueries){
    const url = [this.baseUrl, this.endpoint].join('/')
    const params = this.generateQueries(query)
    return this.http.get<T[]>(url, { params })
  }
  getById(id: number){
    const url = [this.baseUrl, this.endpoint, id].join('/')
    return this.http.get<T>(url)
  }
  count(query: HttpQueries | null = null){
    const url = [this.baseUrl, this.endpoint, 'count'].join('/')
    const params = query ? this.generateQueries(query) : {}
    return this.http.get<Count>(url, {params})
  }
  updateById(id: number, data: T){
    const url = [this.baseUrl, this.endpoint, id].join('/')
    return this.http.put<T>(url, data)
  }
  create(data: T){
    const url = [this.baseUrl, this.endpoint].join('/')
    return this.http.post<T>(url, data)
  }
  removeById(id: number){
    const url = [this.baseUrl, this.endpoint, id].join('/')
    return this.http.delete<T>(url)
  }
}
