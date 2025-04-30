import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CityInfoResponse } from '../models/city-info-response';
import { WeatherResponse } from '../models/weather-response';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  constructor(private http: HttpClient) {
  }

  getCityInfo(cityName: string): Observable<CityInfoResponse[]> {
    return this.http.get<CityInfoResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q={${cityName}}&limit=10&appid=${environment.API_KEY}`)
  }


  getWeatherByCity(latitude: number, longitud: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitud}&appid=${environment.API_KEY}&cnt=1`)
  }
}
