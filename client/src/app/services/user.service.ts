import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { User } from './user';

export interface Credentials{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseCrudService<User>{

  constructor(public override http: HttpClient) {
    super(http)
    this.endpoint = 'users'
  }
  login(credentials: Credentials){
    const url = [this.baseUrl, 'login' ].join('/');
    return this.http.post<User>(url, credentials)
  }
}
