import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Globe, Zap, Layout, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Technology {
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon: JSX.Element;
  color: string;
  key: string;
}

const TechStack = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  
  const AUTO_CHANGE_INTERVAL = 8000; // 8 seconds

  const technologies: Technology[] = [
    {
      key: 'react',
      name: t('techStack.technologies.react.name'),
      description: t('techStack.technologies.react.description'),
      category: 'frontend',
      icon: <Code />,
      color: 'bg-blue-600'
    },
    {
      key: 'typescript',
      name: t('techStack.technologies.typescript.name'),
      description: t('techStack.technologies.typescript.description'),
      category: 'frontend',
      icon: <Code />,
      color: 'bg-blue-500'
    },
    {
      key: 'tailwind',
      name: t('techStack.technologies.tailwind.name'),
      description: t('techStack.technologies.tailwind.description'),
      category: 'frontend',
      icon: <Layout />,
      color: 'bg-teal-500'
    },
    {
      key: 'framerMotion',
      name: t('techStack.technologies.framerMotion.name'),
      description: t('techStack.technologies.framerMotion.description'),
      category: 'frontend',
      icon: <Zap />,
      color: 'bg-purple-600'
    },
    {
      key: 'reactRouter',
      name: t('techStack.technologies.reactRouter.name'),
      description: t('techStack.technologies.reactRouter.description'),
      category: 'frontend',
      icon: <Globe />,
      color: 'bg-red-500'
    },
    {
      key: 'laravel',
      name: t('techStack.technologies.laravel.name'),
      description: t('techStack.technologies.laravel.description'),
      category: 'backend',
      icon: <Server />,
      color: 'bg-red-600'
    },
    {
      key: 'php',
      name: t('techStack.technologies.php.name'),
      description: t('techStack.technologies.php.description'),
      category: 'backend',
      icon: <Server />,
      color: 'bg-indigo-600'
    },
    {
      key: 'postgresql',
      name: t('techStack.technologies.postgresql.name'),
      description: t('techStack.technologies.postgresql.description'),
      category: 'database',
      icon: <Database />,
      color: 'bg-blue-600'
    },
    {
      key: 'vite',
      name: t('techStack.technologies.vite.name'),
      description: t('techStack.technologies.vite.description'),
      category: 'tools',
      icon: <RefreshCw />,
      color: 'bg-purple-500'
    },
    {
      key: 'i18next',
      name: t('techStack.technologies.i18next.name'),
      description: t('techStack.technologies.i18next.description'),
      category: 'tools',
      icon: <Globe />,
      color: 'bg-green-600'
    },
  ];

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  // Handle tab auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      const categories = ['all', 'frontend', 'backend', 'database', 'tools'];
      const nextIndex = (categories.indexOf(activeCategory) + 1) % categories.length;
      setActiveCategory(categories[nextIndex]);
      setProgress(0); // Reset progress when tab changes
    }, AUTO_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [activeCategory]);

  // Handle progress bar
  useEffect(() => {
    // Update progress every 100ms
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        // Calculate how much to increase per 100ms
        const increaseAmount = 100 / (AUTO_CHANGE_INTERVAL / 100);
        return Math.min(100, prevProgress + increaseAmount);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeCategory]);

  // Reset progress when manually changing tabs
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setProgress(0); // Reset progress bar to start
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center">
                <Code className="mr-2 h-6 w-6 text-blue-400" />
                {t('techStack.title')}
              </h2>
              <p className="text-gray-400 mt-1">{t('techStack.subtitle')}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-2">
              <button 
                onClick={() => handleCategoryChange('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t('techStack.categories.all')}
              </button>
              <button 
                onClick={() => handleCategoryChange('frontend')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === 'frontend' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t('techStack.categories.frontend')}
              </button>
              <button 
                onClick={() => handleCategoryChange('backend')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === 'backend' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t('techStack.categories.backend')}
              </button>
              <button 
                onClick={() => handleCategoryChange('database')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === 'database' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t('techStack.categories.database')}
              </button>
              <button 
                onClick={() => handleCategoryChange('tools')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === 'tools' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t('techStack.categories.tools')}
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 h-1 rounded mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-lg overflow-hidden cursor-pointer transform transition-all ${
                  hoveredTech === tech.key ? 'scale-105 z-10' : 'scale-100'
                }`}
                onMouseEnter={() => setHoveredTech(tech.key)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className={`${tech.color} h-2`} />
                <div className="p-4 bg-gray-700">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${tech.color}`}>
                      {tech.icon}
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">{tech.name}</h3>
                  </div>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredTech === tech.key ? 'auto' : 0,
                      opacity: hoveredTech === tech.key ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-gray-300 text-sm overflow-hidden"
                  >
                    {tech.description}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 p-4">
          <div className="flex flex-wrap justify-center">
            {technologies.map((tech, index) => (
              <motion.div
                key={`orbit-${tech.key}`}
                className="m-1 px-2 py-1 rounded-full bg-gray-800 bg-opacity-30 backdrop-blur-sm text-xs text-white"
                animate={{
                  y: [0, -5, 0, 5, 0],
                  x: [0, 3, 0, -3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack; 