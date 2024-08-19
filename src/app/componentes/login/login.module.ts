import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoLoginComponent } from './medico-login/medico-login.component';
import { AdministradorLoginComponent } from './administrador-login/administrador-login.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegisterModule } from '../register/register.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MedicoLoginComponent,
    AdministradorLoginComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RegisterModule,
    ToastModule
  ],exports:[
    MedicoLoginComponent,
    AdministradorLoginComponent,
  ]
})
export class LoginModule { }
