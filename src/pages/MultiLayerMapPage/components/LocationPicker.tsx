import { Icon, LatLngExpression } from 'leaflet';
import React from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import pickedMarkerIconUrl from 'assets/icons/loaction-pin-clear.svg';

const pickedMarker = new Icon({
  iconSize: [35, 35],
  iconUrl: pickedMarkerIconUrl
});

function LocationPicker(): JSX.Element | null {
  const [position, setPosition] = React.useState<LatLngExpression|null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  React.useEffect(() => {
    console.log('Map position is: ', position);
  }, [position]);

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