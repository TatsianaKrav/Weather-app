import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { CityInfoResponse } from '../models/city-info-response';
import { WeatherResponse } from '../models/weather-response';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  hasError = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  getCityInfo(cityName: string): Observable<CityInfoResponse[]> {
    return this.http.get<CityInfoResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q={${cityName}}&limit=10&appid=${environment.API_KEY}`)
      .pipe(
        catchError(err => {
          return of([])
        })
      )
  }


  getWeatherByCity(latitude: number, longitud: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`https://api.penweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitud}&appid=${environment.API_KEY}&cnt=8`)
      .pipe(
        catchError(err => {
          this.hasError.next(true);
          throw Error('request failed')
        })
      )
  }
}
