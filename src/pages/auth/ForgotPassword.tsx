import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  // Schema de validação do formulário
  const forgotPasswordSchema = z.object({
    email: z.string().email(t('validation.invalidEmail')),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setFormError(null);
      await forgotPassword(data.email);
      setSuccess(true);
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <AuthLayout 
      title={t('auth.recoverPassword')}
      subtitle={t('auth.recoverInstructions')}
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

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6"
          >
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{t('auth.checkEmail')}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {t('auth.emailSent')}
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {t('auth.backToLogin')}
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={t('auth.email')}
              type="email"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="ex@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
            >
              {t('auth.sendInstructions')}
            </Button>
          </form>
        )}

        {!success && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('auth.backToLogin')}
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;