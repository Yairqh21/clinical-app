import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'zoom-control-component',
  template: `

<div class="zoom-control">
    <ion-button (click)="goToMyLocation()">
      <ion-icon name="locate-outline"></ion-icon>
    </ion-button>

    <div class="zoom-in-out">
      <ion-list >
        <ion-item button class="zoom-in" (click)="zoomIn()">
          <ion-icon name="add-circle-outline"></ion-icon>
        </ion-item>
        <ion-item button class="zoom-out" (click)="zoomOut()">
          <ion-icon name="remove-circle-outline"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-label>
        <span>{{ zoom | customPercentage:18 }}</span>
      </ion-label>
    </div>
</div>


  `,
  styleUrls: ['./zoom-control.component.scss'],
})
export class ZoomControlComponent  implements OnInit {

  @Input() userLocation: [number, number] | null = null;
  @Input() zoom: number | null = null;

  private toastService = inject(ToastService);
  private mapService = inject(MapService);

  ngOnInit() {}

  goToMyLocation() {
    if(!this.userLocation) {
      this.toastService.presentToast('Error', 'No hay ubicación del usuario', 'bottom', 'danger', 3000);
      return;
    }
    this.mapService.flyTo(this.userLocation);
  }

  zoomIn() {
    if(this.zoom === null) return
    this.zoom = this.zoom + 1;
    this.mapService.setMapZoom(this.zoom);

  }

  zoomOut() {
    if(this.zoom === null) return
    this.zoom = this.zoom - 1;
    this.mapService.setMapZoom(this.zoom);
  }

}
