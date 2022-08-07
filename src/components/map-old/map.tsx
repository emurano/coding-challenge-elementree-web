import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl, { Map as MapBoxMap } from 'mapbox-gl';
import styles from './map.module.css';
import { initialiseMapBox, MapRef } from "./map-box-init";

interface Location {
  lng: number;
  lat: number;
}

interface MapProps {
  locations: Location[];
}

function Map({ locations }: MapProps) {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<MapBoxMap>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [markerLocations, setMarketLocations] = useState<Location[]>([]);
  const setMap = (newMap: MapBoxMap) => {
    map.current = newMap;
  };
  const [ready, setReady] = useState(false);
  const mapReady = () => setReady(true);

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current) {
      initialiseMapBox(map, mapContainer, mapReady, {
        startingPosition: [lng, lat],
        startingZoom: zoom,
        setLng,
        setLat,
        setZoom,
      });

      console.log('map-old == ', map);
    }
  }, [lng, lat, zoom, map.current, mapContainer.current]);

  useEffect(() => {
    console.log('location update effect', markerLocations, map.current);

    markerLocations.forEach((loc) => {
      const marker = new mapboxgl.Marker().setLngLat(loc);

      if (map.current) {
        marker.addTo(map.current);
      }
    });
  }, [markerLocations, map.current]);

  useEffect(() => {
    setMarketLocations(locations);
  }, [locations, ready]);

  return (
    <div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} |
        <span data-testid="map-play-zoom">Zoom: {zoom}</span>
      </div>
      <div
        ref={mapContainer}
        className={styles['map-container']}
        data-testid="map-play-map-object"
      />
    </div>
  );
}

export default Map;