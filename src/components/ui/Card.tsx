import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const Card = ({ children, title, subtitle, className = '' }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

export default Card;