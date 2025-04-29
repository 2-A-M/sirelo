import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';

// Schema zod para validação do formulário
// Valida email como um formato válido e senha com mínimo de 6 caracteres
const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional(),
});

// Tipo inferido do schema para tipagem do form
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  // Configuração do react-hook-form com resolver do zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // Handler de submit que chama o método login do contexto
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setFormError(null);
      await login(data.email, data.password, data.remember);
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <AuthLayout 
      title="Bem-vindo"
      subtitle="Faça login na sua conta para continuar"
    >
      <div className="p-6">
        {/* Exibe mensagem de erro caso ocorra falha no login */}
        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600"
          >
            {formError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Senha"
            type="password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            placeholder="******"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Lembrar de mim"
              {...register('remember')}
            />
            
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
          >
            Entrar
          </Button>
        </form>

        {/* Link para registro de nova conta */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;