import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Import i18n config
import './i18n';

// Configura o dark mode como padrão (permanently)
document.documentElement.classList.add('dark');

// Remove any possibility of light mode
if (localStorage.getItem('theme') === 'light') {
  localStorage.removeItem('theme');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
