import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/core/services/auth.guard'


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./view/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./view/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: '',
    loadChildren: () => import('./view/main/main.module').then(m => m.MainModule) ,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
