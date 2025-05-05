import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRoutes from './routes/AppRoutes';

// Componente raiz da aplicação
// Configura o Router, AuthProvider, LanguageProvider e o Toaster para notificações
function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
          {/* Configuração global do Toaster para notificações */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
              },
              // Estilos específicos para notificações de sucesso
              success: {
                style: {
                  background: '#10B981',
                },
              },
              // Estilos específicos para notificações de erro
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;