import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { forkJoin, timer  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {
  graficas: { nombre: string, imagenBase64: string }[] = [];
  usuario: any;
  visible: boolean = false;
  lstDias!: any[];
  horaInicio!: Date;
  horaFin!: Date;
  suscripcion:any = {}; 
  images: any[] | undefined;
  tiposSuscripciones: any[] = [];
  //LISTA HORARIOS
  objHorarios: {} = {} as any;
  //FORMULARIOS
  frmHorariosTipoPago: FormGroup;
  frmPagoTarjeta: FormGroup;
  //BANCOS
  lstBancos = [
    { nombre: 'Banco A', id: 1 },
    { nombre: 'Banco B', id: 2 },
    { nombre: 'Banco C', id: 3 },
    { nombre: 'Banco D', id: 4 },
    { nombre: 'Banco E', id: 5 }
  ];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  
  constructor(
    private loginRegisterService:LoginRegisterService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router,
  ){
    //FORMULARIOS
    this.frmHorariosTipoPago = this.fb.group({
      diasLaborales: [[], Validators.required], 
      horaInicio: [null,Validators.required],  
      horaFin: [null,Validators.required],     
      tipoSuscripcion: [null,Validators.required] 
    });
    this.frmPagoTarjeta = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      banco: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      fechaVencimiento: ['', Validators.required]
    });
    this.lstDias = [
      {id: 1, dia: "LUNES"},
      {id: 2, dia: "MARTES"},
      {id: 3, dia: "MIÉRCOLES"},
      {id: 4, dia: "JUEVES"},
      {id: 5, dia: "VIERNES"},
      {id: 6, dia: "SÁBADO"},
      {id: 7, dia: "DOMINGO"},
    ];
    
    this.horaInicio = new Date();
    this.horaFin = new Date();
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.setInitialTimes();
    this.obtenerTiposSuscripciones();
    // this.asignarValoresPrueba();
    this.loginRegisterService.obtenerGraficas().subscribe(
      (data: any) => {
      this.graficas = [
          { nombre: 'Gráfica de Médico con Más Consultas', imagenBase64: data.graficaMasConsultas },
          { nombre: 'Gráfica de Especialidades', imagenBase64: data.graficaEspecialidad }
      ];
      },
      (error) => {
      console.error('Error al obtener gráficas', error);
      });
      this.images = [
        { itemImageSrc: 'assets/img/1.jpg', alt: 'Description for Image 1', title: 'Title 1' },
        { itemImageSrc: 'assets/img/2.jpg', alt: 'Description for Image 2', title: 'Title 2' },
        { itemImageSrc: 'assets/img/3.jpg', alt: 'Description for Image 3', title: 'Title 3' }
      ];
  }

  setInitialTimes() {
    this.horaInicio.setHours(8, 0, 0, 0);
    this.horaFin.setHours(20, 0, 0, 0);
  }

  obtenerUsuario(): void {
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      console.log(this.usuario);
      if (this.usuario.esMedico && this.usuario.estatus === '2') {
        this.showDialog();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }
    } else {
      this.router.navigate(['']);
      console.log('No hay usuario en el localStorage');
    }
  }
  
  obtenerTiposSuscripciones(){
    this.loginRegisterService.getListaSuscripcion().subscribe({
      next: (response) =>{
        // console.log(response);
        this.tiposSuscripciones = response;
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      },
      error: (error: HttpErrorResponse) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
      }
    });
  }

  showDialog() {
    this.visible = true;
  }  

  extraerHora(fecha: Date): string {
    const horas = fecha.getHours().toString().padStart(2, '0'); // Asegura que tenga 2 dígitos
    const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegura que tenga 2 dígitos
    return `${horas}:${minutos}`;
  }

  prepraraValores() {
    /*DESTRUCTURACIÓN DE OBJETOS*/
    const formularioUnificado = {
      ...this.frmHorariosTipoPago.value,
      ...this.frmPagoTarjeta.value,
      ...this.usuario
    };

    /*DATOS PARA GENERAR EL HORARIO*/
    this.objHorarios = {
      idMedico: formularioUnificado.id, 
      diasSeleccionados : formularioUnificado.diasLaborales,
      horaInicio : this.extraerHora(formularioUnificado.horaInicio),
      horaFin : this.extraerHora(formularioUnificado.horaFin),
    }

    /*DATOS PARA GENERAR EL PAGO*/
    const tipoSuscripcion = formularioUnificado.tipoSuscripcion;
    const fechaInicio = new Date();
    this.suscripcion = {
        id: 0,
        idTipoSuscripcion: tipoSuscripcion.id,
        idMedico: formularioUnificado.id,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
    };
    this.confirmarPago();
  }

  confirmarPago(){
    this.confirmationService.confirm({
      message: '¿Deseas confirmar el pago y registro de horario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:"Si",
      rejectIcon:"none",
      rejectLabel:"No",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.realizarPagoyRegistrarHorarios()
      },
      reject: () => {
      }
    });
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

  // realizarPagoyRegistrarHorarios(){
    
  //   this.loginRegisterService.postMedicoHorarios(this.objHorarios).subscribe({
  //     next: (response) =>{
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
  //     },
  //     error: (error: HttpErrorResponse) =>{
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
  //     }
  //   });

  //   //  ACTURALIZAR ESTATUS
  //   this.loginRegisterService.putAutorizarMedico(this.usuario.id!,'3').subscribe({
  //     next: (response) =>{
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
  //       this.visible = false;
  //     },
  //     error: (error: HttpErrorResponse) =>{
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
  //     }
  //   });

  //   // INSERCION EN LA TABLA DE SUSCRIPCIONES
  //   this.loginRegisterService.postSuscripciones(this.suscripcion).subscribe({
  //     next: (response) =>{
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
  //     },
  //     error: (error: HttpErrorResponse) =>{
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });        
  //     }
  //   });

  //   this.logout();
  //   this.visible = false;

  // }

  


realizarPagoyRegistrarHorarios() {
  forkJoin({
    horarios: this.loginRegisterService.postMedicoHorarios(this.objHorarios),
    actualizarEstatus: this.loginRegisterService.putAutorizarMedico(this.usuario.id!, '3'),
    suscripciones: this.loginRegisterService.postSuscripciones(this.suscripcion)
  }).pipe(
    concatMap(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.horarios.message });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.actualizarEstatus.message });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.suscripciones.message });
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Requiere volver a iniciar sesión.' });
      return timer(5000);
    })
  ).subscribe({
    next: () => {
      this.visible = false;
      this.logout();
    },
    error: (error: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
    }
  });
}


  /*FUNCIONES A ELIMINAR*/
  asignarValoresPrueba() {
    this.frmHorariosTipoPago.setValue({
      diasLaborales: [
        { id: 1, dia: 'Lunes' },
        { id: 2, dia: 'Martes' },
        { id: 3, dia: 'Miércoles' },
        { id: 4, dia: 'Jueves' },
        { id: 5, dia: 'Viernes' },
        { id: 6, dia: 'Sábado' },
        { id: 7, dia: 'Domingo' }
      ],
      horaInicio: new Date('2024-08-18T08:00:00'),
      horaFin: new Date('2024-08-18T20:00:00'),
      tipoSuscripcion: {
        id: 5,
        duracion: 6,
        nombre: 'Semestral',
        descripcion: 'Suscripción válida por 6 meses',
        precio: 500
      }
    });

    this.frmPagoTarjeta.setValue({
      numeroTarjeta: '1234567887654321',
      banco: { nombre: 'Banco D', id: 4 },
      cvv: '123',
      fechaVencimiento: '12/28'
    });
  }

  // imprimir(){
  //   console.log(
  //     this.frmHorariosTipoPago.value,
  //     this.frmPagoTarjeta.value
  //   );
  // }

}
