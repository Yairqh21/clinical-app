import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = environment.mapboxAccessToken;



if (environment.production) {
  enableProdMode();
}

if(!navigator.geolocation) {
  alert('Tu navegador no soporta la geolocalización');
  throw new Error('Tu navegador no soporta la geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window);
