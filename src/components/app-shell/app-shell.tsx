import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './app-shell.module.css';
import MapController from 'components/map-controller';

const queryClient = new QueryClient();

function AppShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-shell" className={styles.appShell}>
        <MapController />
      </div>
    </QueryClientProvider>
  );
}

export default AppShell;
