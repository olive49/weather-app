import axios, { AxiosInstance } from 'axios';
import { HeaderKeys, weatherApiBaseUrl } from '../global';

interface IApiService {
  getWeather(location: string | number): Promise<any>;
}

class ApiService implements IApiService {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string, headers: {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  private async getFetch(params: {}) {
    console.log('PARAMS', params);
    try {
      const options = {
        method: 'GET',
        params,
      };
      const response = await this.axiosInstance.request(options);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async getWeather(location: string | number) {
    try {
      return await this.getFetch({ q: location });
    } catch (err) {
      throw err;
    }
  }
}

const apiServiceInstance = new ApiService(weatherApiBaseUrl, {
  [HeaderKeys.X_RAPIDAPI_KEY]: process.env.WEATHER_API_KEY,
  [HeaderKeys.X_RAPIDAPI_HOST]: process.env.WEATHER_API_HOST,
});
export default apiServiceInstance;
