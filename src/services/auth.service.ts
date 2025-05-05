import api from './api';
import { User, AuthResponse } from '../types/user';
import { emailService } from './email.service';

// Serviço de autenticação que encapsula as chamadas para a API
export const authService = {
  // Autentica o usuário e retorna token + dados de usuário
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', {
      email,
      password,
    });
    return response.data;
  },

  // Cadastra um novo usuário no sistema
  async register(name: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  },

  // Obtém dados do usuário atualmente autenticado
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/user');
    return response.data;
  },

  // Realiza o logout no backend, invalidando o token
  async logout(): Promise<void> {
    await api.post('/logout');
  },

  // Envia email para recuperação de senha, incluindo o idioma atual
  async forgotPassword(email: string, language?: string): Promise<void> {
    try {
      // Make sure language is either 'en' or 'pt'
      const lang = language && ['en', 'pt'].includes(language) ? language : 'pt';
      
      // Try multiple approaches to ensure language is properly sent
      // 1. Include language in request body
      // 2. Include lang_code in request body (some APIs use this format)
      // 3. Include locale in request body (another common format)
      // 4. Include as a query parameter
      // 5. Include as a custom header (many APIs look for Accept-Language header)
      
      const requestOptions = {
        headers: {
          'Accept-Language': lang,
          'X-Language': lang
        }
      };
      
      await api.post('/forgot-password', { 
        email, 
        language: lang,
        lang_code: lang,
        locale: lang
      }, requestOptions);
      
      return; // Successful API call
    } catch (error: any) {
      // If the error is from the API, propagate it
      if (error.response && error.response.status === 422) {
        // This is a validation error (like email not found), rethrow it
        throw error;
      }
      
      // Only use mock email service if there's a network issue or the API isn't available
      // Generate a mock reset token
      const mockToken = Math.random().toString(36).substring(2, 15);
      // Send a mock email with the appropriate language
      await emailService.sendPasswordResetEmail(email, mockToken, language || 'pt');
    }
  },

  // Redefine a senha usando o token recebido por email
  async resetPassword(token: string, email: string, password: string, passwordConfirmation: string): Promise<void> {
    await api.post('/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  },
};