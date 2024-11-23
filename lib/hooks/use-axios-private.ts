import React from 'react';
import axios from '../../config/axios';
import { getCookie, ONE_DAY, setCookie } from '../cookie';

const useAxiosPrivate = () => {
  React.useEffect(() => {
    const request_intercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          const cookie = getCookie('session_id');

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
      (response) => {
        const cookie = getCookie('session_id');

        if (cookie) {
          setCookie('session_id', cookie, ONE_DAY);
        }

        return response;
      },
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
