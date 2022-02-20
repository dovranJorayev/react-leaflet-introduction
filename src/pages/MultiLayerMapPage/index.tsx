import styled from "@emotion/styled";
import React from 'react';
import SpinnerLoader from "components/SpinnerLoader";
import { Icon, LatLngExpression } from "leaflet";
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { useMarkersData } from "./hooks/useMarkersData";
import { MarkerItem } from "api/getMarkers";
import PopupContent from "components/PopupContent";
import LocationPicker from "./components/LocationPicker";
import pickedMarkerIconUrl from 'assets/icons/location-pin-primary.svg';
import LocationsStatus from "./components/LocationsStatus";

const pickedMarker = new Icon({
  iconSize: [40, 40],
  iconUrl: pickedMarkerIconUrl
});

const center: LatLngExpression = [37.862499, 58.238056];

const StyledMapContainer = styled(MapContainer, { label: 'MapContainer' })({
  minHeight: '100vh',
  width: '100%'
});

const StyledSpinnerLoader = styled(SpinnerLoader, {label: 'SpinnerLoader'})({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#141414',
  '& span': {
    color: '#fff',
    fontSize: 14
  }
});

const StyledPopupContent = styled(PopupContent, {label: 'PopupContent'})({
  minWidth: '50px',
  minHeight: '17px',
  '& [data-popup-content="popup-text"]': {
    color: '#141414',
    fontSize: 12
  }
});

const StyledPopup = styled(Popup, {label: 'Popup'})({
  '& .leaflet-popup-content': {
    margin: '5px'
  },
  '& .leaflet-popup': {
    marginBottom: '45px'
  },
  '& .leaflet-popup-close-button': {
    display: 'none'
  }
});

function MultiLayerMapPage(): JSX.Element {
  const [position, setPosition] = React.useState<LatLngExpression | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<MarkerItem | null>(null);
  const { isLoading: isMarkersLoading, data: markers, mutateMarkers } = useMarkersData();

  const addMarker = (marker: MarkerItem): void => {
    mutateMarkers([
      ...(markers || []),
      marker
    ]);
  };

  const deleteMarker = (marker: MarkerItem): void => {
    mutateMarkers(
      (markers || []).filter(
        item => item.id !== marker.id
      )
    );
  };

  if(isMarkersLoading) {
    return <StyledSpinnerLoader/>;
  }

  return (
    <StyledMapContainer
      zoom={13}
      center={center}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Road mode">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Sattelite hybrid mode">
          <ReactLeafletGoogleLayer type={"hybrid"} />
        </LayersControl.BaseLayer>
      </LayersControl>

      <LocationsStatus
        currentPosition={position}
        markers={markers ?? []}
        addMarker={addMarker}
        deleteMarker={deleteMarker}
      />

      {
        markers && markers.map( marker => (
          <Marker 
            icon={pickedMarker}
            key={marker.id}
            position={marker.coords}
            eventHandlers={{
              click: (e) => {
                setActiveMarker(marker);
              }
            }}
          />
        ))
      }

      {
        activeMarker && <StyledPopup
          position={activeMarker.coords}
          onClose={() => {
            setActiveMarker(null);
          }}
        >
          <StyledPopupContent
            text={activeMarker.title}
          />
        </StyledPopup>
      }

      <LocationPicker
        position={position}
        onPositionChange={setPosition}
      />
    </StyledMapContainer>
  );
}

export default MultiLayerMapPage;