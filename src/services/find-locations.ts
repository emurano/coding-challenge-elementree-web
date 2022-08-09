import { Coordinates, MapBounds } from 'shared/types';
import axios, { AxiosError } from "axios";

const API_BASEURL = process.env.REACT_APP_API_BASEURL || '';

const en = (raw: number) => encodeURIComponent(raw);

export async function findLocations(bounds: MapBounds | undefined): Promise<Coordinates[]> {

  if (!bounds) return [];

  let url = API_BASEURL;
  url += '/locations';
  url += `?swlat=${en(bounds.sw.lat)}`;
  url += `&swlng=${en(bounds.sw.lng)}`;
  url += `&nelat=${en(bounds.ne.lat)}`;
  url += `&nelng=${en(bounds.ne.lng)}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {

    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 400) {
      throw new Error('The map could not find locations from the server');
    }

    console.log('error message', (error as AxiosError));

    throw error;
  }
}
