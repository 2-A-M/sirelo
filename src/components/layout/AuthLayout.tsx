import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Footer from './Footer';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-between p-4">
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-lg"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
      <Footer className="py-4" />
    </div>
  );
};

export default AuthLayout;