import { Icon, LatLngExpression } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import pickedMarkerIconUrl from 'assets/icons/location-pin-success.svg';

interface LocationPickerProps {
  position: LatLngExpression|null;
  onPositionChange: (position: LatLngExpression) => void;
}

const pickedMarker = new Icon({
  iconSize: [40, 40],
  iconUrl: pickedMarkerIconUrl
});

function LocationPicker({ position, onPositionChange }: LocationPickerProps): JSX.Element | null {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    }
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      icon={pickedMarker}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationPicker;