import LanguageSwitcher from '../LanguageSwitcher';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {

  return (
    <div className={`${className} relative`}>
      {/* GitHub link */}
      <motion.a
        href="https://github.com/2-A-M"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-700 transition-all"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
        }}
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: [0.8, 1, 0.8],
          boxShadow: [
            '0 0 0px rgba(59, 130, 246, 0)',
            '0 0 4px rgba(59, 130, 246, 0.3)',
            '0 0 0px rgba(59, 130, 246, 0)'
          ]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Github size={20} />
      </motion.a>

      {/* Language switcher */}
      <div className="flex justify-center mb-4">
        <LanguageSwitcher />
      </div>
      
      {/* Rodapé de créditos */}
      <div className="text-gray-600 dark:text-gray-300 text-xs font-light mt-1 md:mt-2 text-center flex justify-center items-center flex-wrap">
        {/* Container for animated elements to prevent layout shifts */}
        <div className="inline-flex items-center">
          <span>Created with</span> 
          <span 
            id="heart-emoji"
            className="transition-all duration-300 inline-block"
            style={{ width: '18px', height: '18px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
          >🤍</span>
          <span>by</span>
        </div>
        <a 
          href="https://2am.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative inline-block transition-all duration-300 text-sm"
          style={{ 
            textShadow: '0 0 1px rgba(59, 130, 246, 0.3)', 
            padding: '2px 4px',
            textUnderlineOffset: '2px'
          }}
          onMouseEnter={(e) => activateHeartEffect(e.currentTarget)}
          onMouseLeave={(e) => deactivateHeartEffect(e.currentTarget)}
        >2AM</a>
      </div>
    </div>
  );
};

// Funções auxiliares para animação do coração
const activateHeartEffect = (element: HTMLElement) => {
  element.style.textShadow = '0 0 10px rgba(59, 130, 246, 1.0), 0 0 20px rgba(250, 250, 250, 0.8)';
  element.style.color = '#3b82f6';
  const heartEmoji = document.getElementById('heart-emoji');
  if (heartEmoji) {
    heartEmoji.innerHTML = '❤️';
    heartEmoji.style.filter = 'drop-shadow(0 0 8px rgba(239, 68, 68, 1.0))';
    
    // We keep the container the same size but animate the content inside
    heartEmoji.style.animation = 'heartbeat 0.8s infinite';
    
    // Adiciona keyframes dinamicamente se ainda não existirem
    if (!document.getElementById('heart-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'heart-keyframes';
      styleSheet.textContent = `
        @keyframes heartbeat {
          0% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.8)); }
          15% { transform: scale(1.5); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 1.0)); }
          30% { transform: scale(1.3); filter: drop-shadow(0 0 9px rgba(239, 68, 68, 0.9)); }
          50% { transform: scale(1.5); filter: drop-shadow(0 0 12px rgba(239, 68, 68, 1.0)); }
          75% { transform: scale(1.3); filter: drop-shadow(0 0 9px rgba(239, 68, 68, 0.9)); }
          100% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.8)); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }
};

const deactivateHeartEffect = (element: HTMLElement) => {
  element.style.textShadow = '0 0 1px rgba(59, 130, 246, 0.3)';
  element.style.color = '';
  const heartEmoji = document.getElementById('heart-emoji');
  if (heartEmoji) {
    heartEmoji.innerHTML = '🤍';
    heartEmoji.style.filter = '';
    heartEmoji.style.transform = '';
    heartEmoji.style.animation = '';
  }
};

export default Footer; 