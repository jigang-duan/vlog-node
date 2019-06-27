import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { provide, scope, ScopeEnum } from 'midway';

export interface ICurl {
  instance: AxiosInstance;
}

@scope(ScopeEnum.Singleton)
@provide('curl')
export class Curl implements ICurl {

  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    // request interceptor
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      error => {
        console.log(error);
        return Promise.reject(error);
      }
    )
    // response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      error => {
        console.log(error);
        return Promise.reject(error);
      }
    )
  }

}
