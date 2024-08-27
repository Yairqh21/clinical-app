import { Component, Input} from '@angular/core';

@Component({
  selector: 'indicators-component',
  template: `
    <ion-card>
      <div class="card-content">
        <ion-icon name="car" class="car-icon"></ion-icon>
        <div class="info">
          <h1>{{ duration }}</h1>
          <p>{{ distance.toFixed(2) }} km | {{ (distance / 1.609).toFixed(2) }} mi</p>
        </div>
      </div>
    </ion-card>
  `,
  styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent {


  @Input() duration: string = null;
  @Input() distance: number = 0;


}
