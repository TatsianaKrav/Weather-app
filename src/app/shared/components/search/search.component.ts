import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitySearchService } from '../../services/city-search.service';
import {
  CityAndWeatherModel,
  WeatherInfo,
} from '../../models/weather-response';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  protected readonly searchControl = new FormControl('');
  dropdownOptions: string[] = [];
  weatherInfo: CityAndWeatherModel | null = null;
  showMenu = false;
  hasData = false;
  message = 'There is no data';
  isCheckedTime = true;
  lat = 0;
  lon = 0;

  constructor(
    public citySearchService: CitySearchService,
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.getWeather();
        this.hideMenu();
      }
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.citySearchService
            .getCityInfo(value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
              this.dropdownOptions = data.map((cityObj) => cityObj.name);
            });

          this.hasData = true;
        } else {
          this.router.navigate(['/main']);
          this.weatherInfo = null;
        }
      });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.hasData = true;
      const lat = Number(params['lat']);
      const lon = Number(params['lon']);
      const filter = params['by'];

      if (lat && lon && filter) {
        this.lat = lat;
        this.lon = lon;

        if (filter === 'time') {
          this.getWeatherByTime(lat, lon);
          this.isCheckedTime = true;
        } else if (filter === 'days') {
          this.getWeatherByDays(lat, lon);
          this.isCheckedTime = false;
        }
      }
    });

    this.citySearchService.hasError.subscribe((value) => {
      value
        ? ((this.message = 'Request failed'), this.router.navigate(['/main']))
        : (this.message = 'There is no data');
    });
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

  handleTab(): void {
    this.isCheckedTime = !this.isCheckedTime;
    this.getWeather();
  }

  getWeather(): void {
    const value = this.searchControl.getRawValue();

    if (value) {
      this.citySearchService
        .getCityInfo(value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          const cityToFind = data.find(
            (city) => city.name.toLowerCase() === value.toLowerCase()
          );

          if (cityToFind) {
            this.hasData = true;
            const lat = cityToFind.lat;
            const lon = Number(cityToFind.lon);

            this.isCheckedTime
              ? this.getWeatherByTime(lat, lon)
              : this.getWeatherByDays(lat, lon);
          } else {
            this.hasData = false;
            this.router.navigate(['/main']);
            this.weatherInfo = null;
          }
        });
    } else if (!value && this.lat && this.lon) {
      this.isCheckedTime
        ? this.getWeatherByTime(this.lat, this.lon)
        : this.getWeatherByDays(this.lat, this.lon);
    }
  }

  getWeatherByTime(lat: number, lon: number): void {
    this.citySearchService
      .getWeatherByCity(lat, lon)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((info) => {
        if (info) {
          this.updateUrl(lat, lon, 'time');
          this.weatherInfo = {
            cityName: info.city.name,
            list: info.list,
            period: this.isCheckedTime,
          };
        }
      });
  }

  getWeatherByDays(lat: number, lon: number): void {
    this.citySearchService
      .getWeatherByDays(lat, lon)
      .pipe(takeUntilDestroyed(this.destroyRef))

      .subscribe((info) => {
        if (info) {
          this.updateUrl(lat, lon, 'days');

          const currentDate = new Date();
          const daysCount = 5;
          const days: WeatherInfo[] = [];

          for (let i = 0; i < daysCount; i++) {
            const currDay = info.list.find(
              (el) =>
                new Date(el.dt_txt).getDate() === currentDate.getDate() &&
                new Date(el.dt_txt).getMonth() === currentDate.getMonth()
            );

            if (currDay) {
              days.push(currDay);
            }

            currentDate.setDate(currentDate.getDate() + 1);
          }

          this.weatherInfo = {
            cityName: info.city.name,
            list: days,
            period: this.isCheckedTime,
          };
        }
      });
  }

  updateUrl(lat: number, lon: number, filter: string): void {
    this.router.navigate(['/main'], {
      queryParams: {
        lat: lat,
        lon: lon,
        by: filter,
      },
    });
  }
}
