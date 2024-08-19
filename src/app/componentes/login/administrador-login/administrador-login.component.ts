import { Component, OnInit } from '@angular/core';
import { ILoginAdministrador } from '../../../interfaces/login';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-login',
  standalone: false,
  templateUrl: './administrador-login.component.html',
  styleUrl: './administrador-login.component.css',
  providers:[ MessageService]
})
export class AdministradorLoginComponent implements OnInit {
  public objLoginAdministrador = {} as ILoginAdministrador; 

  constructor(
    private loginRegisterService:LoginRegisterService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.llenarValoresDePrueba();
  }

  login(){
    console.log(this.objLoginAdministrador);
    if (!this.objLoginAdministrador.email || !this.objLoginAdministrador.contrasena){
      this.messageService.add({ severity: 'error', summary: 'Error', detail:"Para iniciar sesión es necesario ingresar sus credencailes correctamente." });
      return;
    }
    this.loginRegisterService.loginAdmon(this.objLoginAdministrador).subscribe({
      next: (response) =>{
        console.log(response);
        if(response){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Inicio de sesión correcto"});  

          const usuario = {
            ...response,
            esAdmon: true,
            esMedico: false
          };

          localStorage.setItem('usuario', JSON.stringify(usuario));

          this.router.navigate(['home']);

        }
        
      }, 
      error: (error: HttpErrorResponse) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }

  /*FUCIONES A ELIMINAR*/
  llenarValoresDePrueba(){
    this.objLoginAdministrador = {
      email: "erickAdmon@gmail.com",
      contrasena: "Contra123."
    }
  }
}
