import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KategoriUsiaComponent } from './kategori-usia.component';
import { KategoriUsiaActionComponent } from './kategori-usia-action/kategori-usia-action.component';
import { CurrentKategoriUsiaResolverService } from './current-kategori-usia-resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: KategoriUsiaComponent
  },
  {
    path: 'action',
    component: KategoriUsiaActionComponent,
    resolve: {
      currentData: CurrentKategoriUsiaResolverService,
    }
  }
]


@NgModule({
  declarations: [
    KategoriUsiaComponent,
    KategoriUsiaActionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class KategoriUsiaModule { }
