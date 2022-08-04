import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import React from "react";

type MapRef = React.MutableRefObject<Map | undefined>;
type ContainerRef = React.MutableRefObject<HTMLInputElement>;

export interface MapOptions {
  startingPosition: LngLatLike;
  startingZoom: number;
  setLng: (lng: number) => void;
  setLat: (lat: number) => void;
  setZoom: (zoom: number) => void;
  // testStyle?: mapboxgl.Style | string | undefined;
  style?: any;
  testMode?: boolean
}

export function initialiseMapBox(
    map: MapRef,
    container: ContainerRef,
    { startingPosition, startingZoom, setZoom, setLng, setLat }: MapOptions
) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";

  initialiseMapBoxCore(map, container, {
    startingPosition,
    startingZoom,
    setZoom,
    setLng,
    setLat,
    style: 'mapbox://styles/mapbox/streets-v11',
    testMode: false
  });
}

export function initialiseMapBoxCore(
  map: MapRef,
  container: ContainerRef,
  { startingPosition, startingZoom, setZoom, setLng, setLat, style, testMode }: MapOptions
) {
  const mapbox = new Map({
    container: container.current,
    center: startingPosition,
    zoom: startingZoom,
    testMode: !!testMode,
    style
  });

  mapbox.on("load", () => {
    map.current = mapbox;
  });

  mapbox.on("zoomend", () => {
    if (map.current) {
      console.log("A zoomend event occurred.", map.current.getZoom());
      setZoom(parseFloat(map.current.getZoom().toFixed(2)));
    }
  });

  mapbox.on("moveend", () => {
    if (map.current) {
      console.log("A moveend event occurred.", map.current.getBounds());
      setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
      map.current?.getBounds()
    }
  });
}
