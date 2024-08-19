import { Routes } from '@angular/router';
import { MedicoLoginComponent } from './componentes/login/medico-login/medico-login.component'; 
import { AdministradorLoginComponent } from './componentes/login/administrador-login/administrador-login.component';
import { HomeComponent } from './componentes/pages/home/home.component';
import { BarraLateralComponent } from './componentes/barra-lateral/barra-lateral.component';
import { SolicitudesRegistroComponent } from './componentes/pages/solicitudes-registro/solicitudes-registro.component';
import { CitasComponent } from './componentes/pages/citas/citas.component';
import { MiCuentaComponent } from './componentes/pages/mi-cuenta/mi-cuenta.component';

export const routes: Routes = [
    {path: '', component: MedicoLoginComponent},
    {path: 'loginAdministrador', component: AdministradorLoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: BarraLateralComponent},
    {path: 'solicitudes-registro', component: SolicitudesRegistroComponent},
    {path: 'citas', component: CitasComponent},
    {path: 'mi-cuenta', component: MiCuentaComponent},
];
