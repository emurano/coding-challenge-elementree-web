import React from 'react';
import Map from '../map';
import { useMapController } from 'components/map-controller/use-map-controller';
import HoveringLoader from 'components/hovering-loader';
import { HoveringError } from 'components/hovering-error/hovering-error';

export default function MapController() {
  const {
    bounds,
    setBounds,
    onBoundsChange,
    isLoading,
    isError,
    error,
    locations,
  } = useMapController();

  return (
    <div style={{ height: '100vh' }}>
      {isLoading && <HoveringLoader />}
      {isError && error && <HoveringError errorMessage={error} />}
      <Map
        initialCentre={{ lat: 37.7577, lng: -122.43 }}
        onBoundsChange={onBoundsChange}
        markerLocations={locations}
      />
    </div>
  );
}
