import { Component, Input } from '@angular/core';
import { GeoService } from '../services/geo.service';
import { Place } from '../models/place';
@Component({
    selector: 'place-view',
    templateUrl: './place-view.component.html'
})
export class PlaceViewComponent {
    @Input() id: number;
    private info: Place;

    constructor(private geoService: GeoService) {
    }
    
    ngOnInit() {
        this.geoService.getPlaceInfoById(this.id)
            .do(x => {
                this.info = x;
                console.info(x);
            })
            .subscribe();
    }

    get name(): string {
        if (this.info) {
            return this.info.name;
        }
    }
}