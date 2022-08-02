import React from "react";
import MapPlay from "../map-play";
import 'mapbox-gl/dist/mapbox-gl.css';

function AppShell() {
  return (
    <div data-testid="app-shell">
      <MapPlay />
    </div>
  );
}

export default AppShell;
