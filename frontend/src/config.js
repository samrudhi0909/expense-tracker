const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_URL = isLocalhost
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_API_URL;