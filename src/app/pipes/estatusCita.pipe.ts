import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusCitas',
  standalone: true
})

export class EstatusCitasPipe implements PipeTransform {

  transform(value: string): string {
    if (value === '1'  ) {
      return 'Activo';
    } else if(value === '0') {
      return 'Pendiente';
    }else{
      return 'Sin Estatus';
    }
  }
}

