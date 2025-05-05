import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';
import { TechStackButton } from '../../components/TechStackModal';

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Schema para validação do formulário
  const registerSchema = z.object({
    name: z.string().min(2, t('auth.nameMinLength')),
    email: z.string().email(t('validation.invalidEmail')),
    password: z.string().min(8, t('validation.minLength', { count: 8 })),
    passwordConfirmation: z.string().min(8, t('validation.required')),
    terms: z.boolean().refine(val => val === true, {
      message: t('auth.mustAcceptTerms')
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: t('auth.passwordsDontMatch'),
    path: ['passwordConfirmation'],
  });

  type RegisterFormValues = z.infer<typeof registerSchema>;

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
      title={t('auth.createAccount')}
      subtitle={t('auth.registerSubtitle')}
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
            label={t('auth.fullName')}
            icon={<User className="h-5 w-5 text-gray-400" />}
            placeholder="Chuck Norris"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label={t('auth.email')}
            type="email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            placeholder="ex@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label={t('auth.password')}
            type="password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            placeholder="********"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label={t('auth.confirmPassword')}
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
                  {t('auth.agreeToTerms')}{' '}
                  <Link
                    to="#"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {t('auth.termsOfService')}
                  </Link>{' '}
                  {t('auth.and')}{' '}
                  <Link
                    to="#"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {t('auth.privacyPolicy')}
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
            {t('auth.createAccount')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.haveAccount')}{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
        
        {/* Tech Stack Button */}
        <div className="mt-6 flex justify-center">
          <TechStackButton />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;