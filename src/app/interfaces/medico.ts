export interface IMedico {
    id?: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    contrasena?: string;
    telefono?: string;
    calle?: string;
    colonia?: string;
    numero?: string;
    ciudad?: string;
    pais?: string;
    codigo_postal?: string;
    estatus?: string;
    fechaRegistro?: Date;
    fechaValidacion?: Date | null;
    fechaBaja?: Date | null;
    especialidades?: IEspecialidades[]; 
  }
  
export interface ILtsEspecialidades{
  id?: number;
  nombre?: string;
  honorarios?: string;
  cedula?: string; 
  especialidadMedicoIntermedia?: any[];
}

export interface IEspecialidades{
  id_Especialidad?: number;
  num_Cedula?: string;
  honorarios?: string;
}

export interface Especialidad {
  idEspecialidad: number;
  numCedula: string;
  honorarios: number;
  especialidad: string;
}

export interface Medico {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  calle?: string;
  colonia?: string;
  numero?: string;
  ciudad?: string;
  pais?: string;
  codigoPostal?: string;
  estatus?: string;
  fechaRegistro?: string;
  especialidades?: Especialidad[];
}


// cita.model.ts (o cualquier archivo de modelo que uses)
export interface Cita {
  id: number;
  idPaciente: number;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  estatus: string;
  fechaCancelacion: string | null;
  motivoCancelacion: string | null;
  nombrePaciente: string;
  apellidoPaciente: string;
}


export interface CancelarCitaDTO {
  motivoCancelacion: string;
}

export interface Paciente {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  contrasena?: string;
  telefono?: string;
  fechaNacimiento?: string;
  sexo?: string;
  estatus?: string;
  cita?: any[]; // Ajusta el tipo según sea necesario
  pacientesAsignados?: any[]; // Ajusta el tipo según sea necesario
}

export interface CitaDetalle {
  id: number;
  idCita: number;
  observaciones: string;
  diagnostico: string;
  padecimientos: string;
  intervenciones: string;
  fecha: Date; // Puedes usar Date si prefieres manejar las fechas como objetos Date en lugar de strings
  pesoPaciente: number;
  tallaPaciente: number;
  glucosaPaciente: number;
  oxigenacionPaciente: number;
  presionPaciente: number;
  temperaturaCorporalPaciente: number;
}
