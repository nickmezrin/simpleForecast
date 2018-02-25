import { Weather } from "./weather";

export class Place {
    base: string;
    clouds: {
        all: number; 
    }
    coord: {
        lat: number;
        lon: number;
    }
    dt: number;
    id: number;
    main: {
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    }
    name: string;
    weather: Weather[];
}