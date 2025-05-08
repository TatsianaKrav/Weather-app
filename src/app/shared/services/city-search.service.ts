import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { CityInfoResponse } from '../models/city-info-response';
import { WeatherResponse } from '../models/weather-response';
import {
  API_KEY,
  BASE_API_URL_TOKEN,
} from '../../../environments/environment.token';

@Injectable({
  providedIn: 'root',
})
export class CitySearchService {
  private apiKey = inject(API_KEY);
  hasError = new BehaviorSubject(false);

  constructor(
    @Inject(BASE_API_URL_TOKEN) private baseApi: string,
    private http: HttpClient
  ) { }

  getCityInfo(cityName: string): Observable<CityInfoResponse[]> {
    return this.http
      .get<
        CityInfoResponse[]
      >(`${this.baseApi}/geo/1.0/direct?q={${cityName}}&limit=10&appid=${this.apiKey}`)
      .pipe(
        catchError((err) => {
          return of([]);
        })
      );
  }

  getWeatherByCity(
    latitude: number,
    longitud: number
  ): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        `${this.baseApi}/data/2.5/forecast?lat=${latitude}&lon=${longitud}&appid=${this.apiKey}&cnt=8`
      )
      .pipe(
        debounceTime(1000),
        catchError((err) => {
          this.hasError.next(true);
          return throwError(() => err.message);
        })
      );
  }

  getWeatherByDays(
    latitude: number,
    longitud: number
  ): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        `${this.baseApi}/data/2.5/forecast?lat=${latitude}&lon=${longitud}&appid=${this.apiKey}`
      )
      .pipe(debounceTime(1000));
  }
}
