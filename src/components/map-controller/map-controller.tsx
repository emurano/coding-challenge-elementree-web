import React from 'react';
import Map from 'components/map';
import useMapController from 'components/map-controller/use-map-controller';
import HoveringLoader from 'components/hovering-loader';
import HoveringError from 'components/hovering-error';

export default function MapController() {
  const { onBoundsChange, isLoading, isError, error, locations } =
    useMapController();

  return (
    <div style={{ height: '100vh' }}>
      {isLoading && <HoveringLoader testId="loading-spinner" />}
      {isError && error && (
        <HoveringError errorMessage={error} testId="error-message" />
      )}
      <Map
        initialCentre={{ lat: 37.7577, lng: -122.43 }}
        onBoundsChange={onBoundsChange}
        markerLocations={locations}
      />
    </div>
  );
}
