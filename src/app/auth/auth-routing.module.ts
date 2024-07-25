import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard],
      },
      // {
      //   path: 'recoverPassword',
      //   component: RecoverPasswordComponent,
      //   //canActivate: [LoginGuard],
      // },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
