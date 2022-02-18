import styled from "@emotion/styled";
import React from 'react';
import SpinnerLoader from "components/SpinnerLoader";
import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
  FeatureGroup
} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { useMarkersData } from "./hooks/useMarkersData";
import { MarkerItem } from "api/getMarkers";
import PopupContent from "components/PopupContent";
import LocationPicker from "./components/LocationPicker";

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
  const [activeMarker, setActiveMarker] = React.useState<MarkerItem | null>(null);
  const { isLoading: isMarkersLoading, data: markers } = useMarkersData();

  if(isMarkersLoading) {
    return <StyledSpinnerLoader/>;
  }

  return (
    <StyledMapContainer
      zoom={13}
      center={center}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Google">
          <ReactLeafletGoogleLayer type={"hybrid"} />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name="Marker with popup">
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: "blue" }}
              radius={50}
            />
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Feature group">
          <FeatureGroup pathOptions={{ color: "purple" }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
          </FeatureGroup>
        </LayersControl.Overlay>
    
      </LayersControl>

      {
        markers && markers.map( marker => (
          <Marker 
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

      <LocationPicker/>
    </StyledMapContainer>
  );
}

export default MultiLayerMapPage;