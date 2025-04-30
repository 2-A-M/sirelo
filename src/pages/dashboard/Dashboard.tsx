import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Footer from '../../components/layout/Footer';

const welcomeMessages = [
  "Opa, tudo certin? Se você está lendo isso, o app (ainda) não quebrou!",
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Verifica o tema atual ao carregar o componente
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);
  
  // Pega uma mensagem aleatória de boas-vindas
  const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Cabeçalho */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <span className="ml-2 text-xl font-bold">Sistema de Registro e Login</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
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
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {welcomeMessage}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  icon={<LogOut className="h-4 w-4" />}
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Informações do usuário
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Seu perfil
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</h3>
                    <p className="mt-1 text-lg font-semibold">{user?.name || 'Nome do usuário'}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">E-mail</h3>
                    <p className="mt-1 text-lg font-semibold">{user?.email || 'email@exemplo.com'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <Footer className="py-4 bg-white dark:bg-gray-800 shadow-inner" />
    </div>
  );
};

export default Dashboard;