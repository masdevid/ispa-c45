import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { KategoriUsia } from 'src/app/services/kategori-usia';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';
import { ActionResolver } from 'src/app/shared/action-resolver';

@Injectable({
  providedIn: 'root'
})
export class CurrentKategoriUsiaResolverService extends ActionResolver<KategoriUsia>{
  constructor(
    public router:  Router,
    public service: KategoriUsiaService,
    public sb: MatSnackBar
  ) {
    super(router, service, sb);
  }
}
