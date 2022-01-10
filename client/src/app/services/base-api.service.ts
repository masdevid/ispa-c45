import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpQueries } from './http-queries';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(public http: HttpClient) { }
  endpoint: string = '';
  baseUrl: string = environment.host;

  generateQueries(query: HttpQueries){
    console.log(query);

    let params = new HttpParams();
    const { limit, offset, sort, filter } = query;
    params = params.append('limit', limit ?? 10 )
    params = params.append('page', offset ?? 0)
    if (sort) params = params.append('sort', sort)
    if (filter){
      const filters = Object.keys(filter)
      for (let i = 0; i < filters.length; i++) {
        const field = filters[i];
        params = params.append(`where[${field}]`, filter[field])
      }
    }

    return params;
  }


}
