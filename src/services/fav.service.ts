import { Injectable } from "@angular/core";
import { Coordinates } from "../models/coordinates";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Place } from "../models/place";

@Injectable()
export class FavService {
    fav = new BehaviorSubject<number[]>([]);
    constructor() {
        let fav = JSON.parse(localStorage.getItem('fav'));
        if (fav) {
            this.fav.next(fav);
        } else {
            this.fav.next([]);
        }
        this.fav
            .do(x => localStorage.setItem('fav', JSON.stringify(x)))
            .subscribe();
    }

    AddToFav(id: number) {
        let tFav = this.fav.getValue();
        tFav.push(id);
        this.fav.next(tFav);
    }
    
    RemoveFromFav(id: number) {
        let tFav = this.fav.getValue();
        tFav = tFav.filter(x => x !== id);
        this.fav.next(tFav);
    }

    
}