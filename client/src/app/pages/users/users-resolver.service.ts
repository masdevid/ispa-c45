import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseCrudService } from 'src/app/services/base-crud.service';
import { User } from 'src/app/services/user';
import { ActionResolver } from 'src/app/shared/action-resolver';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService extends ActionResolver<User>{
  constructor(
    public router:  Router,
    public service: BaseCrudService<User>,
    public sb: MatSnackBar
  ) {
    super(router, service, sb);
  }

  getById(id){
    return this.service.getById(id)
  }

}
