import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from 'src/app/services/map/map.service';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { UserLocationService } from 'src/app/services/map/user-location.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-how-to-get-here',
  templateUrl: './how-to-get-here.page.html',
  styleUrls: ['./how-to-get-here.page.scss'],
})
export class HowToGetHerePage implements  ViewDidEnter {

  @ViewChild('map') mapElement!: ElementRef;

  public clinicLocation: [number, number] = [-77.05948, -11.95150];
  public userLocation: [number, number] | null = null;
  public map!: Map;
  public zoom: number = 10;



  constructor(
    public mapService: MapService,
    private locationService: UserLocationService,
    private toastService: ToastService,
  ) { }


  async ionViewDidEnter()  {
    try {
      const coords = await this.locationService.getUserLocation();
      if (!coords) throw new Error('No se pudo obtener la ubicación del usuario');
      this.userLocation = coords;
      await this.initializeMap(this.userLocation);

    } catch (error) {
      this.toastService.presentToast('Error', error.message || 'No hay ubicación del usuario', 'bottom', 'danger', 3000);
    }
  }


  private addMarker(location: [number, number], color: string, popupText: string): void {
    const popup = new Popup().setHTML(popupText);
    new Marker({ color })
      .setLngLat(location)
      .setPopup(popup)
      .addTo(this.map);
  }

  async initializeMap(userLocation: [number, number]) {
    this.map = new Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.clinicLocation,
      zoom: this.zoom,
    });

    this.mapService.setMap(this.map);

    this.map.on('style.load', async () => {
      // this.addMarker(this.clinicLocation, 'red', '<h6>Clínica Universitaria</h6><span>Ubicación de la Clínica</span>');
      const popupContent = `
                          <div>
                            <img src="../../../../assets/img/clinica.png" alt="Clinica Universitaria" />
                            <h6>Clínica Universitaria</h6>
                            <span>Av. Universitaria, Comas 15314</span>
                          </div>
                        `;

      this.addMarker(this.clinicLocation, '#07B5CA', popupContent);
      this.addMarker(userLocation, 'green', '<h6>Yo</h6><span>Aquí estoy</span>');
      this.mapService.getRouteBetweenPoints(userLocation, this.clinicLocation);
    });


    this.mapListeners();

  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });
  }

}
