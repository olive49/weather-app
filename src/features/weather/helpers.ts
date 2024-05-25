import { LocationData, LocationWeatherData } from '../../models';
import { weatherService } from './../../services/WeatherService';
import { locationService } from './../../services/LocationService';

export const onGetLocationData = async (newLocation: string): Promise<LocationData> => {
  return await locationService.getLocationData(newLocation);
};

export const onGetWeatherData = async (
  locations: LocationData | LocationData[]
): Promise<LocationWeatherData[] | undefined> => {
  const locationsArray = Array.isArray(locations) ? locations : [locations];
  try {
    return await Promise.all(
      locationsArray.map(async (location) => {
        const weatherData = await weatherService.getWeather(
          location?.lat,
          location?.lon
        );
        return { ...location, weatherData };
      })
    );
  } catch (err) {
    throw err;
  }
};
