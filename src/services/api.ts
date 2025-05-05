import axios from 'axios';
import i18next from 'i18next';

// Define a URL base da API usando variáveis de ambiente
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const API_URL = apiBaseUrl;

// Cria uma instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Importante para autenticação cross-domain
});

// Interceptor de requisição para adicionar o token de autenticação e language
api.interceptors.request.use(
  (config) => {
    // Add authentication token
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add language headers - try multiple formats for maximum compatibility
    const currentLanguage = i18next.language || localStorage.getItem('language') || 'pt';
    
    // Standard Accept-Language header
    config.headers['Accept-Language'] = currentLanguage;
    
    // Custom headers that some backends might use
    config.headers['X-Language'] = currentLanguage;
    config.headers['X-Locale'] = currentLanguage;
    
    // Add language to query params if there are none
    if (!config.params) {
      config.params = {};
    }
    config.params.lang = currentLanguage;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratar erros comuns
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Tratamento de erro de não autorizado
    if (response && response.status === 401) {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    // Formata a mensagem de erro
    let errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
    
    // Extract error message from response data in different formats
    if (response && response.data) {
      if (response.data.message) {
        // Standard message format
        errorMessage = response.data.message;
      } else if (response.data.errors) {
        // Laravel validation errors often come as an object of arrays
        const firstError = Object.values(response.data.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      } else if (typeof response.data === 'string') {
        // Some APIs return plain text errors
        errorMessage = response.data;
      }
    }
    
    // Return a structured error object
    return Promise.reject({ 
      ...error, 
      message: errorMessage,
      status: response ? response.status : null
    });
  }
);

export default api;