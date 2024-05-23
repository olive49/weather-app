import { HttpService, IHttpService } from './HttpService';

interface IWeatherService {
  getWeather(lat: number, lon: number): Promise<any>;
}

class WeatherService implements IWeatherService {
  constructor(private httpService: IHttpService) {}

  async getWeather(lat: number, lon: number) {
    try {
      const weatherData = await this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      return weatherData;
    } catch (err) {
      throw err;
    }
  }
}

const httpService = new HttpService('', {});

export const weatherService = new WeatherService(httpService);
