import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from '@modules/auth/components/show-hide-password/show-hide-password.component';
import { ComponentsModule } from '@shared/components/components.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule, ReactiveFormsModule, ComponentsModule],
  declarations: [LoginPage, ShowHidePasswordComponent],
})
export class LoginPageModule {}
