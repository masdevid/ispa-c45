import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('./pages/landing/landing.module').then(m => m.LandingModule)},
  { path: 'login', loadChildren: ()=>import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'kategori-usia', loadChildren: ()=>import('./pages/kategori-usia/kategori-usia.module').then(m => m.KategoriUsiaModule), canActivate: [AuthGuard]},
  { path: 'training', loadChildren: ()=>import('./pages/training/training.module').then(m => m.TrainingModule), canActivate: [AuthGuard]},
  { path: 'users', loadChildren: ()=>import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
  { path: 'testing', loadChildren: ()=>import('./pages/testing/testing.module').then(m => m.TestingModule), canActivate: [AuthGuard]},
  { path: 'dashboard', loadChildren: ()=>import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  { path: 'error-404', loadChildren: ()=>import('./pages/error404/error404.module').then(m => m.Error404Module)},
  { path: '**', redirectTo: 'error-404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
