import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GeoService } from '../../services/geo.service';
import { Coordinates } from '../../models/coordinates';
import { PlaceInfoPage } from '../place-info/place-info';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Place } from '../../models/place';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public currentCoords: Coordinates;
  public selectedPlace: Coordinates;
  public selectedPlaceInfo: Place;
  public geoLoaded: boolean = false;
  public hasMarker: boolean = false;
  public locationAccepted: boolean = false;
  public defaultInfo: Place;
  constructor(public navCtrl: NavController, private geoService: GeoService,
    public alertCtrl: AlertController) {
    this.geoService.updateCoordinates();
    let place: Place = JSON.parse(localStorage.getItem('savedPlace'));
    if (place) {
      this.selectedPlaceInfo = place;
    }
  }


  get lat(): number {
    if (this.currentCoords) {
      return this.currentCoords.lat;
    } else {
      return 0;
    }
  }

  get lng(): number {
    if (this.currentCoords) {
      return this.currentCoords.lng;
    } else {
      return 0;
    }
  }

  get markerLat(): number {
    if (this.selectedPlace) {
      return this.selectedPlace.lat;
    } else {
      return 0;
    }
  }

  get markerLng(): number {
    if (this.selectedPlace) {
      return this.selectedPlace.lng;
    } else {
      return 0;
    }
  }

  get defaultName(): string {
    if (this.defaultInfo) {
      return this.defaultInfo.name;
    }
  }

  ngOnInit() {
    this.geoService.CurrentGeo
      .do(x => {
        if (x) {
          this.geoLoaded = true;
          this.hasMarker = true;
          this.currentCoords = x;
          this.selectedPlace = x
        }
      })
      .flatMap(x => this.geoService.getPlaceInfo(x))
      .do(x => {
        this.defaultInfo = x;
      })
      .subscribe();
      console.info(document.body.offsetWidth)
      if (document.body.offsetWidth >= 500) {
        this.alertCtrl.create({
          title: 'It seems you use landscape mode or open app in webbrowser',
          subTitle: 'For better experience please use your device in portrait mode',
          buttons: ['OK']
        });
      }
  }

  getSelectPlaceName(): string {
    if (this.selectedPlaceInfo) {
      return this.selectedPlaceInfo.name;
    }
  }

  handleClick(event) {
    this.hasMarker = true;
    this.selectedPlace = event.coords;
    this.geoService.getPlaceInfo(this.selectedPlace)
      .do(x => this.selectedPlaceInfo = x)
      .subscribe();
  }

  AcceptDefault() {
    this.locationAccepted = true;
    if (this.defaultInfo) {
      this.navCtrl.push(PlaceInfoPage, this.defaultInfo)
    }
  }

  AcceptSelected() {
    this.locationAccepted = true;
    if (this.selectedPlaceInfo) {
      this.navCtrl.push(PlaceInfoPage, this.selectedPlaceInfo)
    }
  }

}
