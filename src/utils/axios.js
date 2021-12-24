import axios from 'axios';
import config from '../config';

const opts = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const bindAuthHeaders = (config) => {
  let userInfo = window.localStorage.getItem('x-sd-user');
  let tenantInfo = window.localStorage.getItem('x-sd-tenant');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    config.headers['Authorization'] = `Bearer ${userInfo?.accessToken}`;
  }
  if (tenantInfo) {
    tenantInfo = JSON.parse(tenantInfo);
    config.headers['X-Tenant-Id'] = `${tenantInfo?._id}`;
  }
  return config;
};

const http = axios.create({
  ...opts,
  baseURL: config.BASE_URL,
});

http.interceptors.request.use(bindAuthHeaders);

http.interceptors.response.use((response) => {
  if (response.status === 401 || response.status === 403) {
    window.localStorage.removeItem('x-sd-user');
  }
  return response;
});

export default http;
