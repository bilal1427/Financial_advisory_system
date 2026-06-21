import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Financial Analysis APIs
  createAnalysis: async (data) => {
    const response = await apiClient.post('/analysis', data);
    return response.data;
  },
  
  getAnalysis: async (id) => {
    const response = await apiClient.get(`/analysis/${id}`);
    return response.data;
  },
  
  getHistory: async (email) => {
    const response = await apiClient.get('/analysis/history', {
      params: { email },
    });
    return response.data;
  },
  
  // Dashboard APIs
  getDashboard: async (email) => {
    const response = await apiClient.get('/dashboard', {
      params: { email },
    });
    return response.data;
  },

  // Helper local storage functions for tracking active user
  setUserSession: (name, email) => {
    localStorage.setItem('fa_user_name', name);
    localStorage.setItem('fa_user_email', email);
  },

  getUserSession: () => {
    return {
      name: localStorage.getItem('fa_user_name') || '',
      email: localStorage.getItem('fa_user_email') || '',
    };
  },

  clearUserSession: () => {
    localStorage.removeItem('fa_user_name');
    localStorage.removeItem('fa_user_email');
  }
};
