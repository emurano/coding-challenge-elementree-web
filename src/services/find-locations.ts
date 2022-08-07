import { Coordinates, MapBounds } from 'shared/types';

function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function boundsToString(bounds: MapBounds): string {
  return `${bounds.ne.lng}::${bounds.ne.lat}::${bounds.sw.lng}::${bounds.sw.lat}`;
}

export async function findLocations(bounds: MapBounds): Promise<Coordinates[]> {
  const locations: Coordinates[] = [];
  for (let i = 0; i < 10; i++) {
    locations.push({
      lng: randomNumber(bounds.sw.lng, bounds.ne.lng),
      lat: randomNumber(bounds.sw.lat, bounds.ne.lat)
    });
  }

  return locations;
}
