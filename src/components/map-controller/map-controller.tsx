import React, { useCallback } from "react";
import Map from '../map';
import { Coordinates, MapBounds } from "../map/map";

export default function MapController() {

  const locations: Coordinates[] = [
    {lng: -122.52774892578127, lat: 37.22656333340048},
    {lng: -122.4376, lat: 37.7577}
  ];

  const onBoundsChange = useCallback((bounds: MapBounds) => {
    console.log('got new bounds, go fetch some locations', bounds)
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Map
        initialCentre={{lat: 37.7577, lng: -122.43}}
        onBoundsChange={onBoundsChange}
        markerLocations={locations}/>
    </div>
  );
}
