import { HeaderKeys, weatherApiBaseUrl } from '../global';
import { IHttpService, HttpService } from './HttpService';

interface ILocationService {
  getLocationData(location: string): Promise<any>;
}

class LocationService implements ILocationService {
  constructor(private httpService: IHttpService) {}

  async getLocationData(location: string) {
    try {
      const locationInfo = await this.httpService.get('', { q: location });
      const { lat, lon } = locationInfo?.location;
      return { lat, lon };
    } catch (err) {
      throw err;
    }
  }
}

const httpService = new HttpService(weatherApiBaseUrl, {
  [HeaderKeys.X_RAPIDAPI_KEY]: process.env.REACT_APP_WEATHER_API_KEY,
  [HeaderKeys.X_RAPIDAPI_HOST]: process.env.REACT_APP_WEATHER_API_HOST,
});

export const locationService = new LocationService(httpService);
