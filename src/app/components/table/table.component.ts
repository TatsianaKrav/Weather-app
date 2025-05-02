import { Component, input, OnInit } from '@angular/core';
import { WeatherResponse } from '../../models/weather-response';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  readonly weatherData = input<WeatherResponse>();

  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.weatherData());
  }
}
