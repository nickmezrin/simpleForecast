import { Place } from "./place";

export class Forecast {
    city: {
        coord: {
            lat: number;
            lon: number;
        }
        country: string;
        id: number;
        name: string;
    }
    cnt: number;
    cod: string;
    list: Place[];

}