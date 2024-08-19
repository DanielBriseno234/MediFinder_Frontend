import { Component, OnInit, ViewChild } from '@angular/core';
import { ILoginMedico } from '../../../interfaces/login'; 
import { MedicoRegisterComponent } from '../../register/medico-register/medico-register.component';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-login',
  standalone: false,
  templateUrl: './medico-login.component.html',
  styleUrl: './medico-login.component.css',
  providers:[ MessageService]
})
export class MedicoLoginComponent implements OnInit {
  @ViewChild(MedicoRegisterComponent) medicoRegisterComponent!: MedicoRegisterComponent;
  public objLoginMedico = {} as ILoginMedico; 

  constructor(
    private loginRegisterService:LoginRegisterService,
    private messageService: MessageService,
    private router: Router
  ){
    
  }

  ngOnInit(): void {
    this.llenarlogin();
  }

  public showRegister(){
    this.medicoRegisterComponent.showDialog();
  }

  public iniciarSesion(){
    console.log(this.objLoginMedico);
    if (!this.objLoginMedico.email || !this.objLoginMedico.contrasena){
      this.messageService.add({ severity: 'error', summary: 'Error', detail:"Para iniciar sesión es necesario ingresar sus credencailes correctamente." });
      return;
    }
    this.loginRegisterService.loginMedico(this.objLoginMedico).subscribe({
      next: (response) =>{
        console.log(response);
        const usuario = {
          ...response,
          esAdmon: false,
          esMedico: true
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.router.navigate(['home']);
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error.error);
        if(error.error === "El usuario está pendiente de validación."){
          this.messageService.add({ severity: 'info', summary: 'Info', detail: error.error});
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error});
        }
      }
    });
  }

  /*FUNCIONES A ELIMINAR*/

  llenarlogin(){
    this.objLoginMedico = {
      email: "erick@gmail.com",
      contrasena: "Contra123."
      // email: "silvia.vega@example.com",
      // contrasena: "SilviaV2024!"
    }
  }
}
