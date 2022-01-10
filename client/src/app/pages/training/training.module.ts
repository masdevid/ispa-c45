import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { TrainingActionComponent } from './training-action/training-action.component';
import { CurrentTrainResolverService } from './current-train-resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { KategoriUsiaService } from 'src/app/services/kategori-usia.service';


const routes: Routes = [
  {
    path: '',
    component: TrainingComponent
  },
  {
    path: 'action',
    component: TrainingActionComponent,
    resolve: {
      currentData: CurrentTrainResolverService,
      kategoriUsia: KategoriUsiaService
    }
  }
]

@NgModule({
  declarations: [
    TrainingComponent,
    TrainingActionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainingModule { }
