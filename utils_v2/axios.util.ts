import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const SendAsync = <T>(request: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request(request)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data, errors, success }: any) => {
        if (success) {
          resolve(data);
        } else {
          reject(errors);
          throw new Error(errors);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosInstance.interceptors.request.use(async (request: any) => {
  if (request.data && request.data.files) {
    request.headers['Content-Type'] = 'multipart/form-data';
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.success) {
      return response.data;
    } else {
      return Promise.reject(response?.data.errors);
    }
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  },
);
