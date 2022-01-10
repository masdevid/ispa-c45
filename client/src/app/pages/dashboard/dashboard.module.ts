import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      kategoriUsia: KategoriUsiaService
    }
  },
]


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
