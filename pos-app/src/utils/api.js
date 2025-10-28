import axios from 'axios';

// Get WordPress config from global variable
const config = window.storePOSConfig || {};

// Create axios instance
const api = axios.create({
  baseURL: config.restUrl || '/wp-json/store-pos/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': config.restNonce || '',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByBarcode: (barcode) => api.get(`/products/barcode/${barcode}`),
  getCategories: () => api.get('/products/categories'),
  updateStock: (id, data) => api.put(`/products/${id}/stock`, data),
};

export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  refund: (id, data) => api.post(`/orders/${id}/refund`, data),
};

export const customersAPI = {
  search: (search) => api.get('/customers/search', { params: { search } }),
  getAll: (params) => api.get('/customers', { params }),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
};

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
  open: (id, data) => api.post(`/drawers/${id}/open`, data),
  close: (sessionId, data) => api.post(`/drawers/sessions/${sessionId}/close`, data),
  getActiveSession: (id) => api.get(`/drawers/${id}/active-session`),
  getSessionHistory: (id, params) => api.get(`/drawers/${id}/sessions`, { params }),
};

export const couponsAPI = {
  validate: (data) => api.post('/coupons/validate', data),
  getAll: () => api.get('/coupons'),
};

export const reportsAPI = {
  getSales: (params) => api.get('/reports/sales', { params }),
  getDrawer: (sessionId) => api.get(`/reports/drawer/${sessionId}`),
  getCashier: (params) => api.get('/reports/cashier', { params }),
  getTopProducts: (params) => api.get('/reports/top-products', { params }),
};

export default api;
