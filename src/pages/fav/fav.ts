import { Component } from "@angular/core";
import { FavService } from "../../services/fav.service";
import { Coordinates } from '../../models/coordinates';
@Component({
    selector: 'fav-page',
    templateUrl: './fav.html'
})
export class FavPage {
    fav: number[];
    constructor(private favService: FavService) {
        this.favService.fav
            .do(x => {
                this.fav = x;
            })
            .subscribe();
    }
}