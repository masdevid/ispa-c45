import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersActionComponent } from './users-action/users-action.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersResolverService } from './users-resolver.service'
import { LayoutsModule } from 'src/app/layouts/layouts.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'action',
    component: UsersActionComponent,
    resolve: {
      currentData: UsersResolverService,
    }
  }
]


@NgModule({
  declarations: [
    UsersComponent,
    UsersActionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
