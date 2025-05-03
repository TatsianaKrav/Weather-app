import { Component, DestroyRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CitySearchService } from '../../services/city-search.service';
import { WeatherResponse } from '../../models/weather-response';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
  showMenu = false;
  hasData = '';

  constructor(public citySearchService: CitySearchService, private destroyRef: DestroyRef) {

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.getWeather();
        this.hideMenu();
      }
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        if (value) {
          this.citySearchService.getCityInfo(value)
            .pipe(
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(data => {
              this.dropdownOptions = data.map(cityObj => cityObj.name);
            })

          this.hasData = 'true';
        } else {
          this.hasData = '';
        }
      })
  }

  handleOption(event: Event): void {
    const targetElement = event.target;

    if (targetElement instanceof HTMLElement) {
      this.searchControl.setValue(targetElement.innerText);
      this.hideMenu();
      this.getWeather();
      this.showMenu = false;
    }
  }

  hideMenu(): void {
    this.dropdownOptions = [];
    this.showMenu = false;
  }

  getWeather(): void {
    const value = this.searchControl.getRawValue();

    if (value) {
      this.citySearchService.getCityInfo(value)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(data => {
          const cityToFind = data.find(city => city.name.toLowerCase() === value.toLowerCase());

          if (cityToFind) {
            this.hasData = 'true';
            const lat = cityToFind.lat;
            const lon = Number(cityToFind.lon);

            this.citySearchService.getWeatherByCity(lat, lon)
              .pipe(
                takeUntilDestroyed(this.destroyRef)
              )
              .subscribe(info => {
                if (info) {
                  this.weatherInfo = info;
                }
              })
          } else {
            this.hasData = 'false';
            this.weatherInfo = null;
          }
        })

    }

  }

  menuHandle(): void {
    this.showMenu = true;
  }

}

