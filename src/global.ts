import { v4 as uuidv4 } from 'uuid';

export const weatherApiBaseUrl =
  'https://weatherapi-com.p.rapidapi.com/current.json';

export const LOCATION_STORAGE_KEY = 'location';

export const defaultLocation: LocationData = {
  lat: 32.07,
  lon: 34.76,
  id: uuidv4(),
};

export const FETCH_INTERVAL = 60000

export enum HeaderKeys {
  X_RAPIDAPI_KEY = 'X-RapidAPI-Key',
  X_RAPIDAPI_HOST = 'X-RapidAPI-Host',
}

export interface LocationData {
  lat: number;
  lon: number;
  id?: string;
  weatherData?: {
    name: string;
    weather: [{ description: string }];
    main: { temp: number };
  };
}
