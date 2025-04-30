import axios from 'axios';

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

// Interceptor de requisição para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    const errorMessage = 
      response && response.data && response.data.message
        ? response.data.message
        : 'Ocorreu um erro. Por favor, tente novamente.';
    
    return Promise.reject({ ...error, message: errorMessage });
  }
);

export default api;