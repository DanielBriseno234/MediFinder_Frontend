import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoRegisterComponent } from './medico-register/medico-register.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepperModule } from 'primeng/stepper';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MedicoRegisterComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputNumberModule,
    StepperModule,
    MultiSelectModule,
    AccordionModule,
    ScrollPanelModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule
    
  ],exports:[
    MedicoRegisterComponent,
  ]
})
export class RegisterModule { }
