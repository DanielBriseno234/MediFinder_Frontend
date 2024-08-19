import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SolicitudesRegistroComponent } from './solicitudes-registro/solicitudes-registro.component';
import { HomeComponent } from './home/home.component';
/*COMPONENTES DE LA TABLA*/
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepperModule } from 'primeng/stepper';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EstatusPipe } from '../../pipes/estatus.pipe';
import { CalendarModule } from 'primeng/calendar';
import { SplitterModule } from 'primeng/splitter';
import { CitasComponent } from './citas/citas.component';
import { FechaBonitaPipe } from '../../pipes/fecha/fecha-bonita.pipe';
import { TabViewModule } from 'primeng/tabview';
import { EstatusCitasPipe } from '../../pipes/estatusCita.pipe';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    SolicitudesRegistroComponent,
    HomeComponent,
    CitasComponent,
    MiCuentaComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    HttpClientModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,    
    DialogModule,
    ButtonModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    InputNumberModule,
    StepperModule,
    AccordionModule,
    ScrollPanelModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    EstatusPipe,
    CalendarModule,
    SplitterModule,
    FechaBonitaPipe,
    TabViewModule,
    EstatusCitasPipe,
    AvatarModule,
    AvatarGroupModule,
    GalleriaModule
  ],
  exports: [
    SolicitudesRegistroComponent,
    HomeComponent,
    CitasComponent,
    MiCuentaComponent,
  ]
})
export class PagesModule { }
