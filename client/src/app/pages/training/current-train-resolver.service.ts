import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pasien } from 'src/app/services/pasien';
import { PasienService } from 'src/app/services/pasien.service';
import { ActionResolver } from 'src/app/shared/action-resolver';

@Injectable({
  providedIn: 'root'
})
export class CurrentTrainResolverService extends ActionResolver<Pasien>{
  constructor(
    public router:  Router,
    public service: PasienService,
    public sb: MatSnackBar
  ) {
    super(router, service, sb);
  }
}
