import { Component, Input } from "@angular/core";
import { Place } from "../../models/place";
import { Coordinates } from './../../models/coordinates';
import { NavController } from "ionic-angular";
import { Chart } from 'angular-highcharts';
import { GeoService } from "../../services/geo.service";
import { Forecast } from "../../models/forecast";
import { FavService } from "../../services/fav.service";

@Component({
  selector: 'place-info',
  templateUrl: './place-info.html'
})
export class PlaceInfoPage {
  isFav: boolean;
  chart: Chart;
  info: Place;

  constructor(public navCtrl: NavController, private geoService: GeoService,
    private favService: FavService) {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Temperature',
        data: [1, 2, 3]
      }]
    });
  }

  ngOnInit() {
    let fav = JSON.parse(localStorage.getItem('fav'));
    this.info = this.navCtrl.getActive().getNavParams().data
    console.info(this.info)
    this.geoService.get5DayForecast(this.info.id)
      .do(x => this.updateInfo(x))
      .subscribe();
    this.favService.fav
      .map(x => x.some(c => c === this.info.id))
      .do(x => this.isFav = x)
      .subscribe();
  }

  get name(): string {
    if (this.info) {
      return this.info.name;
    }
  }

  get main(): string {
    if (this.info && this.info.weather && this.info.weather[0]) {
      return this.info.weather[0].main;
    }
  }

  get temperature(): string {
    if (this.info) {
      let val = Math.round(this.info.main.temp - 273)
      if (val < 0) {
        return val.toString();
      } else {
        return `+${val}`;
      }
    }
  }

  private updateInfo(f: Forecast) {
    let values = [];
    let temp: Place[] = [];
    f.list.forEach(x => {
      temp.push(x);
      if (temp.length === 8) {
        let mdVal = temp.map(x => x.main.temp - 273).reduce((a, x) => a + x) / 8;
        values.push(Math.round(mdVal));
        temp = [];
      }
    })
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: '5 day forecast'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        title: {
          text: 'Temperature in C'
        }
      },
      series: [{
        name: 'Temperature',
        data: values
      }]
    });
  }


  AddToFav() {
    this.favService.AddToFav(this.info.id);
  }

  RemoveFromFav() {
    this.favService.RemoveFromFav(this.info.id);
  }

  private get coords(): Coordinates {
    return {
      lat: this.info.coord.lat,
        lng: this.info.coord.lon,
    }
  }
}