import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Cita, CitaDetalle, Paciente } from '../../../interfaces/medico';

@Component({
  selector: 'app-citas',
  standalone: false,
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
  providers:[ConfirmationService, MessageService]

})
export class CitasComponent implements OnInit {
  public lstCitasPendientes: Cita[];
  public lstCitasActivas: Cita[];
  public citas!: any;
  public loading: boolean = true; // <-- spinner de la tabla
  public search!: any | string; // <-- variable para el filtro global
  public citaSeleccionada!: any[];
  public usuario: any;
  public visible: boolean = false;
  public visible2: boolean = false;
  public motivo: string ="";
  public idCita!: number;
  public datosPaciente = {} as Paciente;
  public cita: any = {};
  public visibleInsertar: boolean = true;

  historialClinico: any[] = [];

  citaDetalle: CitaDetalle = {
    id: 0,
    idCita: 0,
    observaciones: '',
    diagnostico: '',
    padecimientos: '',
    intervenciones: '',
    fecha: new Date(),
    pesoPaciente: 0,
    tallaPaciente: 0,
    glucosaPaciente: 0,
    oxigenacionPaciente: 0,
    presionPaciente: 0,
    temperaturaCorporalPaciente: 0
  };

  constructor(
    private loginRegisterService: LoginRegisterService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
    ,
  ){
    this.lstCitasPendientes = [];
    this.lstCitasActivas = [];
  }
  ngOnInit(): void {
    this.loading = false;
    this.obtenerUsuario();
  }

  mostrarHistorial(cita: any){
    this.visibleInsertar = false;
    //console.log(cita);
    //console.log(this.usuario);
    
    this.loginRegisterService.obtenerHistorialClinicoPorPaciente(cita.idPaciente, this.usuario.id).subscribe({
      next: (response) =>{
        console.log(response);
        this.historialClinico = response;
        this.showDialog2();
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error.error);
      }
    });
    
    
  } 

  obtenerUsuario(): void {
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      // console.log(this.usuario);
      this.obtenerCitas(this.usuario.id);
    } else {
      this.router.navigate(['']);
      console.log('No hay usuario en el localStorage');
    }
  }

  confirmarCancelarCita(accion: string,idCita: any){
    this.idCita = idCita;
    this.confirmationService.confirm({
      message: `¿Deseas ${accion} esta cita?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:"Aceptar",
      rejectIcon:"none",
      rejectLabel:"Cancelar",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        if(accion === 'confirmar'){
          this.confirmar(idCita)
        }else{
          this.showDialog();
        }
      },
      reject: () => {
      },
    });
    
  }

  confirmar(id: number){
    this.loginRegisterService.confirmarCitaMedico(id, []).subscribe({
      next: (response)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.obtenerUsuario()
      },
      error: (error: HttpErrorResponse) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        

      }
    });
  }

  cacelar(){
    this.loginRegisterService.cancelarCitaMedico(this.idCita, {motivoCancelacion: this.motivo}).subscribe({
      next: (response)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.obtenerUsuario()
      },
      error: (error: HttpErrorResponse) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        

      }
    });
  }

  
  obtenerCitas(id: any) {
    const fechaActual = new Date();
    this.loginRegisterService.getListaCitas(id).subscribe({
      next: (response) => {
         console.log(response[0].citas);
        //this.lstCitasPendientes = response[0].citas.filter((cita: Cita) => cita.estatus === "0");
        //this.lstCitasActivas = response[0].citas.filter((cita: Cita) => cita.estatus === "1");
        // console.log(this.lstCitasActivas);
        this.lstCitasPendientes = response[0].citas.filter((cita: Cita) => 
          cita.estatus === "0" && new Date(cita.fechaInicio) > fechaActual
        );
  
        this.lstCitasActivas = response[0].citas.filter((cita: Cita) => 
          cita.estatus === "2" && new Date(cita.fechaInicio) > fechaActual
        );
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  showDialog2() {
    this.visible2 = true;
  }
  
  detallePacienteCita(cita: any){
    //console.log('esta es la cita', cita);
    this.visibleInsertar = true;
    this.loginRegisterService.getPacienteId(cita.idPaciente).subscribe({
      next: (response: any) =>{
        // console.log(response);
          this.showDialog2();
          //console.log(response);
          this.datosPaciente = response;
          this.idCita = cita.id
          this.citaDetalle.idCita = cita.id;
          // this.citaDetalle.fecha = '2024-08-15T06:00:00.000Z';
          /*this.citaDetalle = {
            "id": 0,
            "idCita": 1,
            "observaciones": "observaciones de pruebas",
            "diagnostico": "diagnostico de pruebas",
            "padecimientos": "padecimientos de pruebas",
            "intervenciones": "intervenciones de pruebas",
            "fecha": new Date(),
            "pesoPaciente": 89,
            "tallaPaciente": 171,
            "glucosaPaciente": 98,
            "oxigenacionPaciente": 98,
            "presionPaciente": 120,
            "temperaturaCorporalPaciente": 36
          };*/
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
      }
    })
  }

  confirmarHisorial(){
    this.confirmationService.confirm({
      message: `¿Deseas almacenar este registro en el historial del paciente?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:"Aceptar",
      rejectIcon:"none",
      rejectLabel:"Cancelar",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        
        this.guardarHistorial();    
      },
      reject: () => {
      },
    });
  }

  guardarHistorial(){
    console.log('vamos a guardar este registro -->', this.idCita);
    
    this.loginRegisterService.registrarHistorialClinico(this.citaDetalle).subscribe({
      next: (response) =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      
        this.loginRegisterService.terminarCitaMedico(this.idCita, []).subscribe({
          next: (response) =>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            this.visible2 = false;
            this.obtenerUsuario();
            },
          error: (error:HttpErrorResponse)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
          }
        });

      },
      error: (error:HttpErrorResponse)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
      }
    });
    
  }
}
