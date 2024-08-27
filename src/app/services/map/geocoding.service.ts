import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geocoding } from 'src/app/interfaces/geocoding.interface';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) {}

  reverseGeocode(coords: [number, number]): Observable<Geocoding> {
    const [lng, lat] = coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lon=${lng}&lat=${lat}`;
    return this.http.get<Geocoding>(url);
  }
}
