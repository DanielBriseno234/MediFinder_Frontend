import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IMedico, ILtsEspecialidades } from '../../../interfaces/medico';
import { LoginRegisterService } from '../../../servicios/login-register/login-register.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const formGroup = control as FormGroup;
  const contrasena = formGroup.get('contrasena');
  const confirmarContrasena = formGroup.get('confirmarContrasena');

  if (contrasena && confirmarContrasena && contrasena.value !== confirmarContrasena.value) {
    confirmarContrasena.setErrors({ passwordMismatch: true });
  } else {
    confirmarContrasena?.setErrors(null);
  }
  return null;
}

function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[@$!%*?&,.:;-_<>]/.test(value);

  if (value && (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar)) {
    return { weakPassword: true };
  }

  return null;
}


@Component({
  selector: 'app-medico-register',
  templateUrl: './medico-register.component.html',
  styleUrls: ['./medico-register.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class MedicoRegisterComponent implements OnInit {
  public visible: boolean = false;
  public visible2: boolean = false;
  public frmMedico!: FormGroup;
  public frmMedico2!: FormGroup;
  public lstEspecialidades!: ILtsEspecialidades[];
  public especialidadesMedico!: ILtsEspecialidades[];
  public btnHonorariosValid: boolean = true;
  public registroMedico!: IMedico;

  constructor(
    private formBuilder: FormBuilder,
    private loginRegisterService: LoginRegisterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.frmMedico = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^.+@.+\.com$/)]],
      contrasena: ['', [Validators.required, strongPasswordValidator]],
      confirmarContrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      numero: ['', [Validators.required, Validators.min(1)]],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.minLength(5)]]
    }, { validator: passwordMatchValidator });

    this.frmMedico2 = this.formBuilder.group({
      cedula: ['', Validators.required],
      especialidades: [null, Validators.required],
      aviso: [[], Validators.required]
    });

  }

  ngOnInit(): void {
    this.obtenerEspecialidades();
    // this.inicializarValoresDePrueba();
  }

  // VALIDA QUE LOS CAMPOS NUMERICOS SOLO PERMITAN NÚMEROS
  onlyNumbers(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight'||
      key === 'Tab') {
      return;
    }

    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    if (this.frmMedico.valid && this.frmMedico2.valid) {
      // console.log('Formulario enviado', this.frmMedico.value);
      // console.log('Formulario enviado', this.frmMedico2.value);
      this.confirmar();
    } else {
      console.log('Formulario inválido');
    }
  }

  confirmar() {
    this.confirmationService.confirm({
        message: '¿Deseas continuar con el restro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        acceptLabel:"Si",
        rejectIcon:"none",
        rejectLabel:"No",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.visible2 = true;
          // console.log(this.frmMedico2.get('especialidades')?.value);
          this.especialidadesMedico = this.frmMedico2.get('especialidades')?.value;
        },
        reject: () => {
        }
    });
  }

  ingresarHonorarios(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.especialidadesMedico[index].honorarios = value;
    this,this.validarHonoraiosCedulas();    
  }

  ingresaCedulas(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.especialidadesMedico[index].cedula = value;
    this,this.validarHonoraiosCedulas();    
  }
  
  validarHonoraiosCedulas(){
    for (const key in this.especialidadesMedico) {
        if (this.especialidadesMedico[key].honorarios === undefined || this.especialidadesMedico[key].honorarios === '' || this.especialidadesMedico[key].cedula === undefined || this.especialidadesMedico[key].cedula === '' ) {
          this.btnHonorariosValid = true;
          return;
        }
        this.btnHonorariosValid = false;
    }
  }

  confirmarHonorarios(){
   
    this.visible2 = false;
    this.confirmarHonorariosCedulas();
    
  }
  confirmarHonorariosCedulas(){
    let msjHonorarios = "";
    for (const key in this.especialidadesMedico) {
      msjHonorarios +=
        " [ " + this.especialidadesMedico[key].nombre + 
        " - " +
        "$" + this.especialidadesMedico[key].honorarios +
        " con cedula: " +
        this.especialidadesMedico[key].cedula +
        " ] "
    }
    this.confirmationService.confirm({
      message: 
      'Para finalizar debe confirmar la siguiente informacion:\n'
      + msjHonorarios + "\n" + 
      "¿Esta deacuerdo?"
      ,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:"Acepto",
      rejectIcon:"none",
      rejectLabel:"Regresar",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.registrarMedico();
      },
      reject: () => {
        this.visible2 = true;
      }
    });
  }

  registrarMedico(){
    // ARMAR ESPECIALIDADES
    let lstespecialidades = this.frmMedico2.value;
    let especialidades = [];
    for (const key in lstespecialidades.especialidades) {
      especialidades.push(
        {
          id_Especialidad: lstespecialidades.especialidades[key].id,
          num_Cedula: lstespecialidades.especialidades[key].cedula,
          honorarios: lstespecialidades.especialidades[key].honorarios
        }
      );
    }
    // ARMAR REGISTRO A ALMACENAR
    let medico = this.frmMedico.value
    this.registroMedico = {
      nombre: medico.nombre,
      apellido: medico.apellido,
      email: medico.email,
      contrasena: medico.contrasena,
      telefono: medico.telefono,
      calle: medico.calle,
      colonia: medico.colonia,
      numero: medico.numero,
      ciudad: medico.ciudad,
      pais: medico.pais,
      codigo_postal: medico.codigoPostal,
      especialidades: especialidades
    }
    
    // console.log(this.registroMedico);
    
    this.loginRegisterService.addMedico(this.registroMedico).subscribe({
      next: (data) =>{
        //console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        this.visible = false;
      },error: (e) =>{
        //console.log(e);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error });
      }
    });

  }

  obtenerEspecialidades(){
    this.loginRegisterService.getListaEspecialidades().subscribe({
      next: (data) =>{
        //console.log(data);
        this.lstEspecialidades = data;
      },
      error: (e) =>{
        console.log(e);
      }
    });      
  }

  // ------------------------------------------------------------------------------------------
  /*FUNCIONES QUE SERAN ELIMINADAS*/
  
  // inicializarValoresDePrueba(): void {
  //   this.frmMedico.setValue({
  //     nombre: 'Daniela',
  //     apellido: 'Castro',
  //     email: 'daniela.castro@gmail.com',
  //     contrasena: 'DanielaC2024!',
  //     confirmarContrasena: 'DanielaC2024!',
  //     telefono: '5512345678',
  //     calle: 'Calle del Río',
  //     colonia: 'Las Lomas',
  //     numero: '1001',
  //     ciudad: 'Ciudad de México',
  //     pais: 'México',
  //     codigoPostal: '11000'
  //   });
    
  //   this.frmMedico2.setValue({
  //     cedula: '01234567890',
  //     especialidades: [
  //       { id: 8, nombre: 'Psiquiatría', especialidadMedicoIntermedia: [] },
  //       { id: 10, nombre: 'Traumatología', especialidadMedicoIntermedia: [] }
  //     ],
  //     aviso: ['acepto']
  //   });
  // }
  
}
