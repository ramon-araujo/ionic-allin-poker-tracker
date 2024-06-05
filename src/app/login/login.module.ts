import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthenticateFormComponent } from './authenticate-form/authenticate-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
    AuthenticateFormComponent,
    ForgotPasswordFormComponent,
    NewUserFormComponent
  ]
})
export class LoginPageModule {}
