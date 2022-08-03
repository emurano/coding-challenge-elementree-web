import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl, { Map } from "mapbox-gl";
import styles from "./map-play.module.css";

function MapPlay() {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<Map>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';
      const mapbox = new Map({
        container: mapContainer.current,
        center: [lng, lat],
        zoom: zoom,
        style: `mapbox://styles/mapbox/streets-v11`
      })

      mapbox.on('load', () => {
        map.current = mapbox;
      });

      mapbox.on('zoomend', () => {
        if (map.current) {
          console.log('A zoomend event occurred.', map.current.getZoom());
          setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        }
      });

      mapbox.on('moveend', () => {
        if (map.current) {
          console.log('A moveend event occurred.', map.current.getBounds());
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
        }
      });
    }
  });

  return (
    <div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles['map-container']} />
    </div>
  );
}

export default MapPlay;
