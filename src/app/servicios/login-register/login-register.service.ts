import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IMedico, CancelarCitaDTO } from '../../interfaces/medico';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private _endpoint: string = environment.endPoint;
  private _apiurlespecialidades: string = this._endpoint + "Especialidades/";
  private _apiurlmedicos: string = this._endpoint + "Medicos/";
  private _apiurladministradores: string = this._endpoint + "Administradores/";
  private _apiurltipossuscripciones: string = this._endpoint + "TiposSuscripciones/";
  private _apiurlsuscripciones: string = this._endpoint + "Suscripciones/";
  private _apiurlpagos: string = this._endpoint + "PagoSuscripciones/";
  private _apiurlPaciente: string = this._endpoint + "Pacientes/";
  private _apiurlcitas: string = this._endpoint + "Citas/";
  private _apiurlHistorialesClinicos: string = this._endpoint + "HistorialesClinicos/";

  private apiUrl = 'http://127.0.0.1:5000/generarTodasGraficas';
  constructor(private httpClient: HttpClient) { }

  obtenerGraficas(): Observable<any> {
    return this.httpClient.get(this.apiUrl, { responseType: 'json' });
}

  /*HOSTORIAL*/
  registrarHistorialClinico(historial: any): Observable<any> {
    return this.httpClient.post<any>(`${this._apiurlHistorialesClinicos}RegistrarHistorialClinico`, historial);
  }

  obtenerHistorialClinicoPorPaciente(idPaciente: number, idMedico: number): Observable<any> {
    const body = { idMedico: idMedico };
    return this.httpClient.post<any>(`${this._apiurlHistorialesClinicos}ObtenerHistorialClinicoPorPaciente/${idPaciente}`, body);
  }

  /*PACIENTE*/
  getPacienteId(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this._apiurlPaciente}ObtenerPacientePorId/${id}`);
  }

  /*CITA*/
  getListaCitas(idMedico: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this._apiurlcitas}ObtenerCitasMedicos/${idMedico}`);
  }

  confirmarCitaMedico(idCita: number, datosConfirmacion: any): Observable<any> {
    return this.httpClient.put<any>(`${this._apiurlcitas}ConfirmarCitaMedico/${idCita}`, datosConfirmacion);
  }

  cancelarCitaMedico(idCita: number, datosConfirmacion: CancelarCitaDTO): Observable<any> {
    console.log(idCita);
    console.log(datosConfirmacion);
    return this.httpClient.put<any>(`${this._apiurlcitas}CancelarCitaMedico/${idCita}`, datosConfirmacion);
  }

  terminarCitaMedico(idCita: number, datosConfirmacion: any): Observable<any> {
    return this.httpClient.put<any>(`${this._apiurlcitas}TerminarCitaMedico/${idCita}`, datosConfirmacion);
  }

  /*ADMON*/
  loginAdmon(request_: IMedico): Observable<any>{
    return this.httpClient.post<IMedico>(`${this._apiurladministradores}Login`,request_);
  }

  /*MEDICO*/
  addMedico(request_: IMedico): Observable<any>{
    return this.httpClient.post<IMedico>(`${this._apiurlmedicos}Registrar`,request_);
  }

  loginMedico(request_: IMedico): Observable<any>{
    return this.httpClient.post<IMedico>(`${this._apiurlmedicos}Login`,request_);
  }

  getListaEspecialidades(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this._apiurlespecialidades}ConsultarEspecialidades`);
  }

  getListaMedicos(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this._apiurlmedicos}ObtenerMedicosRegistrados`);
  }

  putAutorizarMedico(Id: number, estatus: string): Observable<any> {
    return this.httpClient.put<any>(`${this._apiurlmedicos}AutorizarSolicitud/${Id}/${estatus}`, {});
  }
      /*HORARIOS*/
      postMedicoHorarios(request_: any): Observable<any>{
        return this.httpClient.post<any>(`${this._apiurlmedicos}RegistrarHorasTrabajo`,request_);
      }
  
  /*TIPO SUSVRIPCION*/
  getListaSuscripcion(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this._apiurltipossuscripciones}ObtenerTiposSuscripcionActivos`);
  }

  /*SUSCRIPCION*/
  postSuscripciones(request_: any): Observable<any>{
    return this.httpClient.post<any>(`${this._apiurlsuscripciones}RegistrarSuscripcion`,request_);
  }

  /*pagos*/
  postPagoSuscripciones(request_: any): Observable<any>{
    return this.httpClient.post<any>(`${this._apiurlpagos}RegistrarPago`,request_);
  }
}
