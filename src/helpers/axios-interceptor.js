import axios from 'axios';
import envs from '../config/env';
import { getCookie } from './cookie-helpers';

const headers = {};

const Instance = axios.create({
  baseURL: envs.api_url,
  headers,
});


Instance.interceptors.request.use(
  config => {
    const token = getCookie('_auth') || '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  },
  errors => Promise.reject,
);

export default Instance;
