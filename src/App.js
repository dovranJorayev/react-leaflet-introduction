import * as React from "react"
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
  FeatureGroup
} from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"

const center = [37.862499, 58.238056];

function App() {
  return (
    <div>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={13}
        center={[37.862499, 58.238056]}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
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
      </MapContainer>
    </div>
  );
}

export default App