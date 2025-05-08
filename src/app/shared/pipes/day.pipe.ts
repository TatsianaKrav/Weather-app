import { Pipe, PipeTransform } from '@angular/core';
import { getDayOfWeek } from '../utils/getDayOfWeek';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'long' });
    const dayOfWeek = date.getDay();
    const dayName = getDayOfWeek(dayOfWeek);

    const mdayToDisplay = day < 10 ? `0${day}` : day;

    return `${mdayToDisplay} ${month}, ${dayName}`;
  }
}
