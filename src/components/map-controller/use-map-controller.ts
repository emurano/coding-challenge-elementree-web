import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import findLocations from 'services/find-locations';
import { Coordinates, MapBounds } from 'shared/types';

export interface MapControllerHook {
  onBoundsChange: (newBounds: MapBounds) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  locations: Coordinates[];
}

function useMapController(): MapControllerHook {
  const [bounds, setBounds] = useState<MapBounds>();

  const onBoundsChange = useCallback(
    async (newBounds: MapBounds) => {
      setBounds(newBounds);
    },
    [setBounds]
  );

  const {
    isLoading,
    isError,
    data: locations,
    error,
  } = useQuery([`mapLocations-${boundsToString(bounds)}`], async () => {
    if (bounds) {
      return await findLocations(bounds);
    }

    return [];
  });

  const myError = error as Error;

  return {
    onBoundsChange,
    isLoading,
    isError,
    error: myError?.message,
    locations: locations ?? [],
  };
}

function boundsToString(bounds: MapBounds | undefined): string {
  if (!bounds) return 'undefined';
  return `${bounds.sw.lat}::${bounds.sw.lng}::${bounds.ne.lat}::${bounds.ne.lng}`;
}

export default useMapController;
