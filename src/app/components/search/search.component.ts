import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CitySearchService } from '../../services/city-search.service';
import { WeatherResponse } from '../../models/weather-response';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  protected readonly searchControl = new FormControl('');
  dropdownOptions: string[] = [];
  weatherInfo: WeatherResponse | null = null;

  constructor(private citySearchService: CitySearchService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        if (value) {
          this.citySearchService.getCityInfo(value).subscribe(data => {
            this.dropdownOptions = data.map(cityObj => cityObj.name);

            const cityToFind = data.find(city => city.name === value);

            if (cityToFind) {

              const lat = cityToFind.lat;
              const lon = Number(cityToFind.lon);

              this.citySearchService.getWeatherByCity(lat, lon).subscribe(data => {
                if (data) {
                  this.weatherInfo = data;
                }
              })
            }
          })
        }
      })
  }

}

