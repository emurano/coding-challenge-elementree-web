import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './app-shell.module.css';
import MapController from '../map-controller';

function AppShell() {
  return (
    <div data-testid="app-shell" className={styles.appShell}>
      <MapController />
    </div>
  );
}

export default AppShell;
