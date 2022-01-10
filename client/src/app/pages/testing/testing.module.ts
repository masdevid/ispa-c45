import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: TestingComponent
  },
]

@NgModule({
  declarations: [
    TestingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class TestingModule { }
