import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const hours = date.getHours();
    const mins = date.getMinutes();

    const hoursToDisplay = hours < 10 ? `0${hours}` : hours;
    const minsToDisplay = mins < 10 ? `0${mins}` : mins;
    return `${hoursToDisplay}:${minsToDisplay}`;
  }
}
