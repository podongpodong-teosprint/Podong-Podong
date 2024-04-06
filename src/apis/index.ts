import axios from 'axios';

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  timeout: 100000,
  headers: {
    'x-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  },
  responseType: 'json',
});
