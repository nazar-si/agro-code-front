export interface Feature {
    type: string;
    properties: {
        n: number;
        x: number;
        y: number;
    };
    geometry: {
        type: string;
        coordinates: [
            number, number
        ];
    };
}
export default interface GeoInterface {
    type: string;
    name: string;
    // crs: {}
    features: Feature[];
}