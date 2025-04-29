import { motion } from 'framer-motion';

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const circleVariants = {
  hidden: { 
    y: 0,
    opacity: 0.5
  },
  visible: { 
    y: [0, -15, 0],
    opacity: 1,
    transition: {
      y: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    }
  }
};

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
      <motion.div
        className="flex items-center justify-center space-x-2"
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          variants={circleVariants}
        />
        <motion.div
          className="w-4 h-4 bg-indigo-500 rounded-full"
          variants={circleVariants}
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 bg-purple-500 rounded-full"
          variants={circleVariants}
          transition={{ delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default PageLoader;