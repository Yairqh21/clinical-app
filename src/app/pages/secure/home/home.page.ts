import { Component, OnInit } from '@angular/core';
import { GeocodingService } from 'src/app/services/map/geocoding.service';
import { UserLocationService } from 'src/app/services/map/user-location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public username = '';
  private userId = '';
  public userLocation: [number, number];
  public userAddress: string = '';
  public isLoading = true;

  constructor(
    private geocodingService: GeocodingService,
    private locationService: UserLocationService
  ) { }

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.uid;
      this.username = userDataObj.username;
    }
    this.fetchUserLocation();
  }

  fetchUserLocation() {
    this.locationService.getUserLocation()
      .then((coords) => {
        this.userLocation = coords;
        setTimeout(() => {
          this.isLoading = false;
        },3000);
        this.geocodingService.reverseGeocode(this.userLocation)
          .subscribe((resp) => {
            this.userAddress = resp.display_name;
            // console.log('Dirección del usuario:', this.userAddress);
          });
      });
  }
}

