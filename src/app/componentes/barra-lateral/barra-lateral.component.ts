import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-barra-lateral',
  standalone: false,
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
  providers:[ MessageService]
})
export class BarraLateralComponent implements OnInit{
  public usuario: any;
  public sidebarVisible: boolean = false; 
  public  items: any[] | undefined;

  constructor(
    private router: Router,
    private messageService: MessageService
  ){
    this.usuario = {
      esAdmon: false,
      esMedico: false,
    }
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.usuario.nombreCompleto = this.usuario.nombreCompleto.toUpperCase();
      //console.log(this.usuario);
      
    } else {
      console.log('No hay usuario en el localStorage');
    }
  }

  ngOnInit(): void {
    // this.obtenerUsuario();
    this.routerNavigarionFunction();
    
  }

  // obtenerUsuario(): void {
    
  // }

  showSidebar(){
    this.sidebarVisible = this.sidebarVisible ? false : true;
  }

  routerNavigarionFunction(){
    this.items = [
      {
        label: 'Menú',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            route: '/home'
          },
          {
              label: 'Tabla de Solicitudes',
              icon: 'pi pi-table',
              route: '/solicitudes-registro',
              visible: this.usuario.esAdmon
          },
          {
              label: 'Tabla de Citas',
              icon: 'pi pi-table',
              route: '/citas',
              visible: this.usuario.esMedico
          },
          // {
          //   label: 'Mi cuenta',
          //   icon: 'pi pi-user',
          //   route: '/mi-cuenta'
          // }
        ]
      }
    ];
  }

  logout() {
    const usuarioJson = localStorage.getItem('usuario');

    if (usuarioJson) {
        const usuario = JSON.parse(usuarioJson);
        const esAdmon = usuario.esAdmon;
        const esMedico = usuario.esMedico;
        localStorage.removeItem('usuario');
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Has cerrado sesión correctamente.'
        });
        if (esAdmon) {
            this.router.navigate(['loginAdministrador']);
        } else if (esMedico) {
            this.router.navigate(['']);
        }
    } else {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'No se encontró ninguna sesión activa.'
        });
    }
  }

}
