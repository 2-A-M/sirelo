import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';

// Schema para validação do formulário
const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Por favor, insira um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  passwordConfirmation: z.string().min(8, 'A confirmação de senha é obrigatória'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos de uso' }),
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'As senhas não conferem',
  path: ['passwordConfirmation'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setFormError(null);
      await registerUser(data.name, data.email, data.password, data.passwordConfirmation);
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <AuthLayout 
      title="Criar conta"
      subtitle="Registre-se para começar"
    >
      <div className="p-6">
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
            label="Nome completo"
            icon={<User className="h-5 w-5 text-gray-400" />}
            placeholder="Seu nome"
            error={errors.name?.message}
            {...register('name')}
          />

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
            placeholder="********"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirme a senha"
            type="password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            placeholder="********"
            error={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />

          <div>
            <Checkbox
              label={
                <span>
                  Eu concordo com os{' '}
                  <Link
                    to="#"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link
                    to="#"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Política de Privacidade
                  </Link>
                </span>
              }
              error={errors.terms?.message}
              {...register('terms')}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
          >
            Criar conta
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;