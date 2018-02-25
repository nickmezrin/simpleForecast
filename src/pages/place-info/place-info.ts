import { Component, Input } from "@angular/core";
import { Place } from "../../models/place";
import { NavController } from "ionic-angular";
import { Chart } from 'angular-highcharts';
import { GeoService } from "../../services/geo.service";
import { Forecast } from "../../models/forecast";

@Component({
    selector: 'place-info',
  templateUrl: './place-info.html'
})
export class PlaceInfoPage {
  chart: Chart;
  info: Place;

  constructor(public navCtrl: NavController, private geoService: GeoService){
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
    this.info = this.navCtrl.getActive().getNavParams().data
    console.info(this.info)
    this.geoService.get5DayForecast(this.info.id)
      .do(x => this.updateInfo(x))
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
        let mdVal = temp.map(x => x.main.temp -273).reduce((a,x) => a + x) / 8;
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
}