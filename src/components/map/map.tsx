import React, { MutableRefObject, useCallback, useRef } from 'react';
import MapBox, { MapRef, Marker } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

console.log('MAPBOX_ACCESS_TOKEN', MAPBOX_ACCESS_TOKEN);

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface MapBounds {
  sw: Coordinates;
  ne: Coordinates;
}

interface MapProps {
  initialCentre: Coordinates;
  onBoundsChange: (bounds: MapBounds) => void;
  markerLocations: Coordinates[];
}

function coordinatesKey(coordinates: Coordinates): string {
  return `${coordinates.lat.toString()}::${coordinates.lng.toString()}`;
}

export default function Map({
  initialCentre,
  onBoundsChange,
  markerLocations,
}: MapProps) {
  const mapRef = useRef<MapRef>() as MutableRefObject<MapRef>;

  const onCameraChange = useCallback(() => {
    const bounds = mapRef.current.getBounds();
    const sw = bounds.getSouthWest() as { lat: number; lng: number };
    const ne = bounds.getNorthEast() as { lat: number; lng: number };
    onBoundsChange({ sw, ne });
  }, [mapRef]);

  return (
    <MapBox
      ref={mapRef}
      initialViewState={{
        zoom: 8,
        latitude: initialCentre.lat,
        longitude: initialCentre.lng,
      }}
      onMoveEnd={onCameraChange}
      onPitchEnd={onCameraChange}
      onRotateEnd={onCameraChange}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      {markerLocations.map((loc) => (
        <Marker longitude={loc.lng} latitude={loc.lat} key={coordinatesKey(loc)}/>
      ))}
    </MapBox>
  );
}
