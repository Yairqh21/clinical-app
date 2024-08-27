import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class UserLocationService {


  async getUserLocation(): Promise<[number, number] | null> {
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      console.log('Ubicación del usuario desde el servicio UserLocationService:', { lng: coords.longitude, lat: coords.latitude } );

      return [coords.longitude, coords.latitude];
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      return null; // Devuelve null en caso de error
    }
  }
}
