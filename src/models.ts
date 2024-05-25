export interface LocationData {
  lat: number;
  lon: number;
  id?: string;
}

export interface LocationWeatherData extends LocationData {
  weatherData?: {
    name: string;
    weather: [{ description: string }];
    main: { temp: number; feels_like: number };
  };
}
