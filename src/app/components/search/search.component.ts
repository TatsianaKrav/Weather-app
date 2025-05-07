import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CitySearchService } from '../../services/city-search.service';
import { WeatherResponse } from '../../models/weather-response';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  protected readonly searchControl = new FormControl('');
  dropdownOptions: string[] = [];
  weatherInfo: WeatherResponse | null = null;
  showMenu = false;
  hasData = '';
  message = 'There is no data';

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
            },

            )

          this.hasData = 'true';
        } else {
          this.hasData = '';
          this.router.navigate(['/main']);
          this.weatherInfo = null;
        }
      })
  }
  //switchMap, observ

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['lat'] && params['lon']) {
        this.citySearchService.getWeatherByCity(params['lat'], params['lon'])
          .pipe(
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(info => {
            if (info) {
              this.hasData = 'true';
              this.weatherInfo = info;
            }
          })
      }
    })

    this.citySearchService.hasError.subscribe(value => {
      value
        ? (this.message = 'Request failed', this.router.navigate(['/main']))
        : this.message = 'There is no data';
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

                  //add params
                  this.router.navigate(['/main'], {
                    queryParams: {
                      lat: lat,
                      lon: lon
                    }
                  })
                  this.weatherInfo = info;
                }
              })
          } else {
            this.hasData = 'false';
            this.router.navigate(['/main']);
            this.weatherInfo = null;
          }
        })

    }

  }

  menuHandle(): void {
    this.showMenu = true;
  }

}

