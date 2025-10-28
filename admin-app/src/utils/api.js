import axios from 'axios';

// Get WordPress config from global variable
const config = window.storePOSAdmin || {};

// Create axios instance
const api = axios.create({
  baseURL: config.restUrl || '/wp-json/store-pos/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': config.restNonce || '',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const outletsAPI = {
  getAll: (params) => api.get('/outlets', { params }),
  getById: (id) => api.get(`/outlets/${id}`),
  create: (data) => api.post('/outlets', data),
  update: (id, data) => api.put(`/outlets/${id}`, data),
  delete: (id) => api.delete(`/outlets/${id}`),
  getStats: (id) => api.get(`/outlets/${id}/stats`),
};

export const drawersAPI = {
  getAll: (params) => api.get('/drawers', { params }),
  getById: (id) => api.get(`/drawers/${id}`),
  create: (data) => api.post('/drawers', data),
  update: (id, data) => api.put(`/drawers/${id}`, data),
  delete: (id) => api.delete(`/drawers/${id}`),
  getActiveSession: (id) => api.get(`/drawers/${id}/active-session`),
  getSessionHistory: (id, params) => api.get(`/drawers/${id}/sessions`, { params }),
};

export const reportsAPI = {
  getSales: (params) => api.get('/reports/sales', { params }),
  getDrawer: (sessionId) => api.get(`/reports/drawer/${sessionId}`),
  getCashier: (params) => api.get('/reports/cashier', { params }),
  getTopProducts: (params) => api.get('/reports/top-products', { params }),
};

export default api;
