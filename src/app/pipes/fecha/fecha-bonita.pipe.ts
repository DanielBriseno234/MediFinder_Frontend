import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaBonita',
  standalone: true
})
export class FechaBonitaPipe implements PipeTransform {

  transform(value: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const fecha = new Date(value);
    return fecha.toLocaleDateString('es-ES', options);
  }
}
