import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services API
export const authAPI = {
  register: (phoneNumber: string) => api.post('/auth/register', { phoneNumber }),
  login: (phoneNumber: string, otp: string) => api.post('/auth/login', { phoneNumber, otp }),
};

export const servicesAPI = {
  getAll: (params?: any) => api.get('/services', { params }),
  getById: (id: string) => api.get(`/services/${id}`),
  getNearby: (lat: number, lng: number, radius?: number) => 
    api.get('/services/nearby', { params: { lat, lng, radius } }),
  create: (data: any) => api.post('/services', data),
};

export const avisAPI = {
  getAll: () => api.get('/avis'),
  create: (data: any) => api.post('/avis', data),
  getById: (id: string) => api.get(`/avis/${id}`),
};

export const statsAPI = {
  getDashboard: () => api.get('/stats/dashboard'),
  getTopRated: (limit?: number) => api.get('/stats/services/top-rated', { params: { limit } }),
  getMostReviewed: (limit?: number) => api.get('/stats/services/most-reviewed', { params: { limit } }),
};

export const administrationAPI = {
  getAll: () => api.get('/administrations'),
  getById: (id: string) => api.get(`/administrations/${id}`),
  create: (data: any) => api.post('/administrations', data),
};

export default api;