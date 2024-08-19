import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './componentes/login/login.module';
import { BarraLateralModule } from './componentes/barra-lateral/barra-lateral.module';
import { PagesModule } from './componentes/pages/pages.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModule, BarraLateralModule, PagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'app-medifinder-medico-front';
  mostrarBarraLateral = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarBarraLateral = !['/', '/loginAdministrador'].includes(event.urlAfterRedirects);
      }
    });
  }

}
