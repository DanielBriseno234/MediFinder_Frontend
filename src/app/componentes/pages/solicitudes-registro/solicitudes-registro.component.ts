import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Medico } from '../../../interfaces/medico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-registro',
  standalone: false,
  templateUrl: './solicitudes-registro.component.html',
  styleUrl: './solicitudes-registro.component.css',
  providers:[ConfirmationService, MessageService]
})
export class SolicitudesRegistroComponent implements OnInit {
  public lstMedicos: Medico[];
  /*VARIABLES PARA LA TABLA*/
  public loading: boolean = true; // <-- spinner de la tabla
  public search!: any | string; // <-- variable para el filtro global
  public medicos!: any;
  public medicoSeleccionado!: any[];
  public visible: boolean = false;
  public visible2: boolean = false;
  public objMedicoDetalle = {} as Medico;
  public usuario: any;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ){
    this.lstMedicos = [];
  }

  ngOnInit(): void {
    this.obtenerMedicos();
    this.obtenerUsuario();

  }

  obtenerUsuario(): void {
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
    } else {
      this.router.navigate(['loginAdministrador']);
      console.log('No hay usuario en el localStorage');
    }
  }

  obtenerMedicos(){
    this.loginRegisterService.getListaMedicos().subscribe({
      next: (response) =>{
        this.lstMedicos = response.filter(medico => medico.estatus === '0');
        this.loading = false;
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    });
  }

  detalleMedico(medico: Medico){
    this.showDialog();
    this.objMedicoDetalle = medico;
    // console.log(this.objMedicoDetalle);
    
  }

  confirmarInformacionMedico(){
    console.log(this.objMedicoDetalle);
    this.confirmationService.confirm({
      message: '¿Deseas Autorizar esta solicitud?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:"Si",
      rejectIcon:"none",
      rejectLabel:"No",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.visible2 = true;
        this.autorizarmedico();
      },
      reject: () => {
      }
    });
  }

  autorizarmedico(){
    this.loginRegisterService.putAutorizarMedico(this.objMedicoDetalle.id!,'2').subscribe({
      next: (response) =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.visible = false;
        this.obtenerMedicos();
      },
      error: (error: HttpErrorResponse) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
  
}
