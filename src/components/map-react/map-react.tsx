import * as React from "react";
import Map, { Marker } from "react-map-gl";

export default function MapReact() {

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
  const testMode = false;

  const [viewState, setViewState] = React.useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14
  });

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={mapboxAccessToken}
      testMode={testMode}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}