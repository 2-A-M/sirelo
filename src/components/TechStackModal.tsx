import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, X, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TechStack from './dashboard/TechStack';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechStackModal = ({ isOpen, onClose }: TechStackModalProps) => {
  const { t } = useTranslation();
  
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60 p-4 pt-16 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-6xl bg-gray-900 rounded-lg shadow-xl"
            style={{ maxHeight: 'min(90vh, 700px)' }}
            initial={{ y: -20, scaleY: 0, opacity: 0, transformOrigin: 'top' }}
            animate={{ y: 0, scaleY: 1, opacity: 1 }}
            exit={{ y: -20, scaleY: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="sticky top-0 flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700 z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Code className="h-6 w-6 text-blue-400 mr-2" />
                  <h2 className="text-xl font-bold text-white">{t('techStack.title')}</h2>
                </div>
                <a 
                  href="https://github.com/2-A-M" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                  <Github className="h-4 w-4 mr-1.5" />
                  GitHub
                </a>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 64px)' }}>
              <TechStack />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechStackModal;

// Button component to open the tech stack modal
export const TechStackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-3.5 py-1.5 text-sm rounded-md bg-gradient-to-r from-blue-700/90 to-indigo-700/90 text-white font-medium shadow-sm border border-blue-300/50 relative overflow-hidden backdrop-blur-sm z-10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)" }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(59, 130, 246, 0.7)",
            "0 0 18px rgba(99, 102, 241, 0.9)",
            "0 0 25px rgba(79, 70, 229, 0.8)",
            "0 0 18px rgba(99, 102, 241, 0.9)",
            "0 0 10px rgba(59, 130, 246, 0.7)"
          ],
        }}
        transition={{ 
          boxShadow: { 
            repeat: Infinity, 
            duration: 2.5,
          }
        }}
      >
        <Code className="h-4 w-4 mr-1.5 text-blue-100" />
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-indigo-200 font-semibold z-10">
          {t('techStack.viewButton')}
        </span>
        
        {/* Primary holographic background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-600/30 pointer-events-none"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(56, 189, 248, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(139, 92, 246, 0.3) 100%)",
              "linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(56, 189, 248, 0.3) 100%)",
              "linear-gradient(90deg, rgba(56, 189, 248, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(139, 92, 246, 0.3) 100%)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent absolute -translate-x-full"
            animate={{ translateX: ["0%", "200%"] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 1 
            }}
          />
        </motion.div>
        
        {/* Edge glow */}
        <motion.div 
          className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-[2px] -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
      <TechStackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}; 