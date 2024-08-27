import { Injectable } from '@angular/core';
import { DirectionsApiClient } from 'src/app/api/directionsApiClient';
import { DirectionsResponse, Route } from 'src/app/interfaces/directions';
import { LngLatBounds, LngLatLike, Map, SourceSpecification } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  public distance: number = 0;
  public duration: string = '';

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) { }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.map.flyTo({
      zoom: 14,
      center: coords
    });
  }

  setMapZoom(zoom: number) {
    if (!this.map) throw Error('Mapa no inicializado');
    this.map.zoomTo(zoom);
  }

  public getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => {
        this.drawPolyline(resp.routes[0]);
        this.updateRouteInfo(resp.routes[0]);
      });
  }

  private drawPolyline(route: Route) {
    if (!this.map) throw new Error('Mapa no inicializado');
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map.fitBounds(bounds, {
      padding: { top: 200, bottom: 200, left: 100, right: 100 }
    });

    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
    }
    if (this.map.getSource('RouteString')) {
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }

  private updateRouteInfo(route: Route) {
    this.distance = route.distance / 1000;

    // Convertir a minutos y segundos
  const durationInMinutes = Math.floor(route.duration / 60);
  const durationInSeconds = Math.floor(route.duration % 60);

  this.duration =`${durationInMinutes} minutos, ${durationInSeconds} segundos`;
  }

}
