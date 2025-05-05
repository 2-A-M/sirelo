import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/auth.service';
import { User } from '../types/user';

// Definindo a interface do contexto de autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth tem que ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Verificar se o usuário já está autenticado ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Token inválido ou expirado
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Autenticar usuário
  const login = async (email: string, password: string, remember = false) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData, access_token } = await authService.login(email, password);
      
      // Salvar token dependendo da opção "lembrar-me"
      if (remember) {
        localStorage.setItem('auth_token', access_token);
      } else {
        sessionStorage.setItem('auth_token', access_token);
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      toast.success(t('auth.loginSuccess', 'Login realizado com sucesso!'));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || t('auth.loginError', 'Falha ao fazer login. Por favor, tente novamente.'));
      toast.error(err.message || t('auth.loginError', 'Falha ao fazer login. Por favor, tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  // Registrar novo usuário
  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData, access_token } = await authService.register(name, email, password, passwordConfirmation);
      
      localStorage.setItem('auth_token', access_token);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success(t('auth.registerSuccess', 'Seja bem-vindo!'));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || t('auth.registerError', 'Falha ao registrar. Por favor, tente novamente.'));
      toast.error(err.message || t('auth.registerError', 'Falha ao registrar. Por favor, tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  // Fazer logout
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      // Limpar tokens de ambos os storages
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      toast.success(t('auth.logoutSuccess', 'Até já!'));
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || t('auth.logoutError', 'Erro ao sair. Por favor, tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  // Solicitar reset de senha com mensagem baseada no idioma
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      // Pass the current language to the API if your backend supports it
      await authService.forgotPassword(email, i18n.language);
      toast.success(t('auth.forgotPasswordSuccess', 'E-mail de recuperação enviado com sucesso! Só checar seu inbox que você receberá um e-mail com as instruções para redefinir sua senha.'));
    } catch (err: any) {
      // Extract error message
      const errorMessage = err.message || t('auth.forgotPasswordError', 'Erro ao enviar e-mail de recuperação.');
      
      // Set error in state for display in component
      setError(errorMessage);
      
      // Show toast error notification
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Redefinir senha
  const resetPassword = async (token: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.resetPassword(token, email, password, passwordConfirmation);
      toast.success(t('auth.resetPasswordSuccess', 'Senha redefinida com sucesso! Faça login com sua nova senha.'));
      navigate('/login');
    } catch (err: any) {
      setError(err.message || t('auth.resetPasswordError', 'Erro ao redefinir a senha.'));
      toast.error(err.message || t('auth.resetPasswordError', 'Erro ao redefinir a senha.'));
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};