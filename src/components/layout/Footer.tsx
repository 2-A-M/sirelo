
interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {

  return (
    <div className={`${className}`}>
      {/* Rodapé de créditos */}
      <div className="text-gray-600 dark:text-gray-300 text-xs font-light mt-1 md:mt-2 text-center flex justify-center items-center flex-wrap">
        <div className="inline-flex items-center">
          <span>Created with</span> 
          <span 
            id="heart-emoji"
            className="transition-all duration-300 inline-block mx-1"
          >🤍</span>
        </div>
        <span className="mx-1">by</span>
        <a 
          href="https://github.com/2-A-M" 
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
        >Arthur "2AM" Acha</a>
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
    heartEmoji.style.fontSize = '18px';
    
    // Sem transformação inicial - a animação vai cuidar de tudo
    heartEmoji.style.transform = '';
    
    // Adiciona animação pulsante com velocidade mais lenta
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
          50% { transform: scale(1.7); filter: drop-shadow(0 0 12px rgba(239, 68, 68, 1.0)); }
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
    heartEmoji.style.fontSize = '';
  }
};

export default Footer; 