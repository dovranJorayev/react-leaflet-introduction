import { LatLngExpression } from "leaflet";
import * as getMarkersMock from "assets/mocks/getMarkers.mock.json";

export interface MarkerItem {
  id: number;
  title: string;
  coords: LatLngExpression;
}

export function getMarkers(): Promise<MarkerItem[]> {
  return new Promise(resolve => {
    setTimeout(
      () => resolve(getMarkersMock.data as MarkerItem[]), 
      800
    );
  });
}