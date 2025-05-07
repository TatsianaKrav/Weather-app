import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degrees',
})
export class DegreesPipe implements PipeTransform {
  transform(value: number): number {
    const val = 273.15;
    return +(value - val).toFixed(1);
  }
}
