import { Injectable } from "@angular/core";
import { Coordinates } from "../models/coordinates";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Place } from "../models/place";

@Injectable()
export class GeoService {
    public CurrentGeo = new BehaviorSubject<Coordinates>(new Coordinates);
    private readonly cityInfoEndpoint = `http://api.openweathermap.org/data/2.5/weather?`
    private readonly cityInfoByIdEndpoint = `http://api.openweathermap.org/data/2.5/weather?`
    private readonly forecastEndpoint = `http://api.openweathermap.org/data/2.5/forecast?`
    private readonly requestTail = `&APPID=9b2a30532816223c47d810b295ef4579`
    constructor(private httpClient: Http) {}

    public updateCoordinates() {
        navigator.geolocation.getCurrentPosition((success)=>{
            this.CurrentGeo.next({
                lat: success.coords.latitude,
                lng: success.coords.longitude
            });
        })
    }

    public getPlaceInfo(c: Coordinates): Observable<Place> {
        let url = `${this.cityInfoEndpoint}lat=${c.lat}&lon=${c.lng}${this.requestTail}`;
        return this.httpClient.get(url).map(x => x.json());
    }

    public getPlaceInfoById(id: number): Observable<Place> {
        let url = `${this.cityInfoEndpoint}id=${id}${this.requestTail}`;
        console.info(url)
        return this.httpClient.get(url).map(x => x.json());
    }

    public get5DayForecast(id: number): Observable<any> {
        let url = `${this.forecastEndpoint}id=${id}${this.requestTail}`;
        return this.httpClient.get(url).map(x => x.json());
    }
}