import React, { useCallback, useState } from 'react';
import Map from '../map';
import { Coordinates, MapBounds } from 'shared/types';
import { findLocations } from "services/find-locations";

export default function MapController() {
  const [locations, setLocations] = useState<Coordinates[]>([]);

  const onBoundsChange = useCallback(async (bounds: MapBounds) => {
    const newLocations = await findLocations(bounds);
    setLocations(newLocations);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Map
        initialCentre={{ lat: 37.7577, lng: -122.43 }}
        onBoundsChange={onBoundsChange}
        markerLocations={locations}
      />
    </div>
  );
}
