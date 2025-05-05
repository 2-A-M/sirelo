import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Footer from '../../components/layout/Footer';
import TechStack from '../../components/dashboard/TechStack';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Cabeçalho */}
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <span className="ml-2 text-xl font-bold">{t('dashboard.systemTitle')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="ml-3 relative">
                <div className="flex items-center">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-2xl font-bold text-white">{t('dashboard.title')}</h1>
                <p className="mt-1 text-gray-300">
                  {t('dashboard.welcomeMessage')}
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8">
                <Button
                  variant="outline"
                  onClick={logout}
                  className="p-2"
                  title={t('dashboard.logout')}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-blue-900 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-white">
                      {t('dashboard.userInfo')}
                    </h2>
                    <p className="text-gray-300">
                      {t('dashboard.profile')}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-400">{t('dashboard.name')}</h3>
                    <p className="mt-1 text-lg font-semibold">{user?.name || 'Nome do usuário'}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-400">{t('dashboard.email')}</h3>
                    <p className="mt-1 text-lg font-semibold">{user?.email || 'email@exemplo.com'}</p>
                  </div>
                </div>
              </div>
              
              {/* Tech Stack Component */}
              <TechStack />
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <Footer className="py-4 bg-gray-800 shadow-inner" />
    </div>
  );
};

export default Dashboard;