import mapboxgl, { LngLatLike, Map as MapBoxMap, Map } from "mapbox-gl";
import React from "react";

export type MapRef = React.MutableRefObject<Map | undefined>;
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
    mapReady: () => void,
    { startingPosition, startingZoom, setZoom, setLng, setLat }: MapOptions
) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";

  initialiseMapBoxCore(map, container, mapReady, {
    startingPosition,
    startingZoom,
    setZoom,
    setLng,
    setLat,
    style: 'mapbox://styles/mapbox/streets-v11',
    testMode: false
  });
}

/**
 * Initialise a Map map-old object and attach it to the given HTML element
 *
 * This function can be called by test code to initialise a map-old in testMode
 *
 * @param map - The ref to assign the Map Map object to
 * @param container - The ref pointing to the container
 * @param mapReady - The function that is called when the map-old is completely loaded
 * @param startingPosition - The lat/lng to centre the map-old to on load
 * @param startingZoom - The zoom level to set the map-old to on load
 * @param setZoom - A function that can be called when the zoom is changed
 * @param setLng
 * @param setLat
 * @param style
 * @param testMode
 */
export function initialiseMapBoxCore(
  map: MapRef,
  container: ContainerRef,
  mapReady: () => void,
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
    mapReady();
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
