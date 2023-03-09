import { LatLngExpression, CircleMarker, CircleMarkerOptions } from "leaflet";
export class ArcMarker extends CircleMarker {
  constructor(
    latlng: LatLngExpression,
    options: ArcMarkerOptions | CircleMarkerOptions
  );
    /*
    * Sets the Arc start angle value.
    */
    setStartAngle(degrees: number): void;

    /*
    * Sets the Arc stop angle value.
    */
    setStopAngle(degrees: number): void;

    /*
    * Sets the direction according a given direction and an angle value.
    */
    setDirection(direction:number, degrees: number): void;

    /*
    * Gets the direction.
    */
    getDirection(): number;

    /*
    * Checks if is a Arc
    */
    isSemicircle(): boolean;
}

interface ArcMarkerOptions extends CircleMarkerOptions {
  
    /*
    * Arc Start angle, in degrees, clockwise. Defaults to 0.
    */
    startAngle?: number;

    /*
    * Arc Stop angle, in degrees, clockwise. Defaults to 359.9999.
    */
    stopAngle?: number;

}