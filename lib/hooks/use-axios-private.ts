import React from 'react';
import axios from '../../config/axios';
import { getCookie } from '../cookie';

const useAxiosPrivate = () => {
  React.useEffect(() => {
    const request_intercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          const cookie = getCookie('session_id');

          console.log('[COOKIE]', cookie);

          if (cookie) {
            config.headers['Authorization'] = `Bearer ${cookie}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const response_intercept = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(request_intercept);
      axios.interceptors.response.eject(response_intercept);
    };
  }, []);

  return axios;
};

export default useAxiosPrivate;
