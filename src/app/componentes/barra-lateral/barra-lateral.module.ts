import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from './barra-lateral.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [
    BarraLateralComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule
  ],
  exports: [
    BarraLateralComponent
  ]
})
export class BarraLateralModule { }
