import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return `${date.getHours()}:${date.getMinutes()}0`;
  }

}
