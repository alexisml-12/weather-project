import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_URL_COLUMBIA:string = 'https://api.weather.gov/gridpoints/LWX/31,80/forecast';
  API_URL_KANSAS:string = 'https://api.weather.gov/gridpoints/LWX/31,80/forecast';

  constructor(private httpClient: HttpClient) { }

  getForecastColumbia(): Observable<any>{
    return this.httpClient.get(this.API_URL_COLUMBIA).pipe(res=> res);
  }

  getForecastKansas(): Observable<any>{
    return this.httpClient.get(this.API_URL_KANSAS).pipe(res=> res);
  }
}
