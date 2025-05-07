import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precip',
})
export class PrecipPipe implements PipeTransform {
  transform(value: number): number {
    return value === 0 ? value : value * 100;
  }
}
