import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CityInfoResponse } from '../models/city-info-response';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  constructor(private http: HttpClient) {
  }

  getWeatherByCity(cityName: string): Observable<CityInfoResponse[]> {
    return this.http.get<CityInfoResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q={${cityName}}&limit=10&appid=${environment.API_KEY}`)
  }
}
