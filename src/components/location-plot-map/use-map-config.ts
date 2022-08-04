import { useState } from 'react';
import { ImmutableLike, ViewStateChangeEvent } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import useMapTestMode from './use-map-test-mode';

interface MapState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface UseMapConfig {
  testMode: boolean;
  mapState: MapState;
  setMapState: (newMapState: MapState) => void;
  mapBoxAccessToken: string;
  onMove: (event: ViewStateChangeEvent) => void;
  mapStyle: string | mapboxgl.Style | ImmutableLike | undefined;
}

export default function useMapConfig(initialMapState: MapState): UseMapConfig {
  const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';
  const [mapState, setMapState] = useState(initialMapState);
  const onMove = (event: ViewStateChangeEvent) => {
    console.log('viewState', event.viewState);
    setMapState(event.viewState);
  }
  const mapStyle = 'mapbox://styles/mapbox/streets-v9';
  const testMode = useMapTestMode();

  return {
    testMode,
    mapState,
    setMapState,
    mapBoxAccessToken: testMode ? '' : mapBoxAccessToken,
    onMove,
    mapStyle,
  };
}
