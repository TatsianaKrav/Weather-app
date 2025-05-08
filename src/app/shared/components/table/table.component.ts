import { Component, input } from '@angular/core';
import { CityAndWeatherModel } from '../../models/weather-response';
import { CommonModule } from '@angular/common';
import { PrecipPipe } from '../../pipes/precip.pipe';
import { DegreesPipe } from '../../pipes/degrees.pipe';
import { TimePipe } from '../../pipes/time.pipe';
import { DayPipe } from '../../pipes/day.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PrecipPipe, DegreesPipe, TimePipe, DayPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  readonly weatherData = input<CityAndWeatherModel>();
}
