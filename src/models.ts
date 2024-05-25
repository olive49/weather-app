export interface LocationData {
  lat: number;
  lon: number;
  id?: string;
  weatherData?: {
    name: string;
    weather: [{ description: string }];
    main: { temp: number; feels_like: number };
  };
}
