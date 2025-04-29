import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
      const { user: userData, token } = await authService.login(email, password);
      
      // Salvar token dependendo da opção "lembrar-me"
      if (remember) {
        localStorage.setItem('auth_token', token);
      } else {
        sessionStorage.setItem('auth_token', token);
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao fazer login. Por favor, tente novamente.');
      toast.error(err.message || 'Falha ao fazer login. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Registrar novo usuário
  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData, token } = await authService.register(name, email, password, passwordConfirmation);
      
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Seja bem-vindo!");
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao registrar. Por favor, tente novamente.');
      toast.error(err.message || 'Falha ao registrar. Por favor, tente novamente.');
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
      toast.success("Até já!");
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao sair. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Solicitar reset de senha
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.forgotPassword(email);
      toast.success("E-mail de recuperação enviado com sucesso! Só checar seu inbox que você receberá um e-mail com as instruções para redefinir sua senha.");
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação.');
      toast.error(err.message || 'Erro ao enviar e-mail de recuperação.');
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
      toast.success("Senha redefinida com sucesso! Faça login com sua nova senha.");
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir a senha.');
      toast.error(err.message || 'Erro ao redefinir a senha.');
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