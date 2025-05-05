import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
  const { resetPassword, loading } = useAuth();
  const { token } = useParams<{ token: string }>();
  const [formError, setFormError] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  // Schema para validação do formulário
  const resetPasswordSchema = z.object({
    email: z.string().email(t('validation.invalidEmail')),
    password: z.string().min(8, t('validation.minLength', { count: 8 })),
    passwordConfirmation: z.string().min(8, t('validation.required')),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: t('auth.passwordsDontMatch'),
    path: ['passwordConfirmation'],
  });

  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

  // Extrair o email da query string (caso esteja presente)
  const getEmailFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('email') || '';
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: getEmailFromQuery(),
      password: '',
      passwordConfirmation: '',
    },
  });

  // Se o email estiver na URL, preencher automaticamente o campo
  useEffect(() => {
    const email = getEmailFromQuery();
    if (email) {
      setValue('email', email);
    }
  }, [setValue, location]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setFormError(null);
      if (!token) {
        setFormError(t('auth.invalidToken'));
        return;
      }
      await resetPassword(token, data.email, data.password, data.passwordConfirmation);
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <AuthLayout 
      title={t('auth.resetPassword')}
      subtitle={t('auth.resetPasswordSubtitle')}
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
            label={t('auth.email')}
            type="email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            placeholder="ex@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label={t('auth.newPassword')}
            type="password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            placeholder=""
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label={t('auth.confirmNewPassword')}
            type="password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            placeholder=""
            error={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
          >
            {t('auth.resetPasswordButton')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.rememberedPassword')}{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;