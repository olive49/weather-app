import axios, { AxiosInstance } from 'axios';

export interface IHttpService {
  get(url?: string, params?: {}): Promise<any>;
}

export class HttpService implements IHttpService {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  constructor(baseURL: string, headers: {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
    this.baseUrl = baseURL;
  }

  async get(url?: string, params?: {}): Promise<any> {
    try {
      const getUrl = url ? url : this.baseUrl;
      const result = await this.axiosInstance.get(getUrl, { params });
      return result.data;
    } catch (err) {
      throw err;
    }
  }
}
