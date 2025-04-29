import api from './api';
import { User, AuthResponse } from '../types/user';

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

  // Envia email para recuperação de senha
  async forgotPassword(email: string): Promise<void> {
    await api.post('/forgot-password', { email });
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