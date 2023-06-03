import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@env';

const instance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: AxiosError) => {
    // console.log('failed url', error.request._url);
    // console.log('status', error.request.status);
    // console.log('method', error.request._method);
    // if (!axios.isCancel(error)) {
    //   if (
    //     error &&
    //     ((error.response && error.response.status === 401) ||
    //       error.message === 'Network Error')
    //   ) {
    // console.log('ERROR ERROR ERROR ERROR ERROR', error.request._url);
    // console.log('ERROR ', error);
    //   logout();
    //   }
    // }
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => Promise.reject(error),
);

export { instance };

export const getErrorMessage = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  } else {
    return 'An error occurred';
  }
};

export const getSessionToken = () => {
  return instance.defaults.headers.common.Authorization?.toString().replace(
    'Bearer ',
    '',
  );
};

export const setSessionToken = (token: string) => {
  instance.defaults.headers.common.Authorization = 'Bearer ' + token;
};
