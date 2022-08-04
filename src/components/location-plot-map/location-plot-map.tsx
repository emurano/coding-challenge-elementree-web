import React from 'react';
import Map, { Marker } from 'react-map-gl';
import useMapConfig from './use-map-config';
import styles from './location-plot-map.module.css';

interface Location {
  lat: number;
  lng: number;
}

interface LocationPlotMapProps {
  testId?: string;
  locations: Location[];
}

/**
 * A component for displaying points on a map that have been retrieved from
 * a remote service
 *
 * @param testId The testId to use for the top-most component as well as the
 *    prefix for the testIds for subcomponents that need to be verified in tests
 * @param locations A list of locations to add as markers
 */
export default function LocationPlotMap({
  testId,
  locations,
}: LocationPlotMapProps) {
  const { testMode, mapState, mapBoxAccessToken, onMove, mapStyle } =
    useMapConfig({
      latitude: 37.8,
      longitude: -122.4,
      zoom: 14,
    });

  return (
    <div data-testid={testId} className={styles.locationPlotMap}>
      <Map
        {...mapState}
        onMove={onMove}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={mapBoxAccessToken}
        testMode={testMode}
      >
        {locations.map((location) => (
          <Marker
            key={`${location.lng}-${location.lat}`}
            longitude={location.lng}
            latitude={location.lat}
            color="red"
          />
        ))}
      </Map>
    </div>
  );
}
