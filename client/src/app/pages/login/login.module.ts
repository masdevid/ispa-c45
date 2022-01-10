import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginGuard } from 'src/app/guards/login.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
]


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
