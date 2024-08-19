import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatus',
  standalone: true
})

export class EstatusPipe implements PipeTransform {

  transform(value: string): string {
    if (value === '1' || value === '0' ) {
      return 'Pendiente';
    } else {
      return 'Sin Estatus';
    }
  }
}

