import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl, { Map } from "mapbox-gl";
import styles from "./map-play.module.css";
import { initialiseMapBox } from "./map-box-init";

function MapPlay() {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<Map>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current) {
      initialiseMapBox(map, mapContainer, {
        startingPosition: [lng, lat],
        startingZoom: zoom,
        setLng,
        setLat,
        setZoom
      });
    }
  }, [lng, lat, zoom, map.current, mapContainer.current]);

  return (
    <div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} |
        <span data-testid='map-play-zoom'>Zoom: {zoom}</span>
      </div>
      <div
        ref={mapContainer}
        className={styles["map-container"]}
        data-testid='map-play-map-object'/>
    </div>
  );
}

export default MapPlay;
