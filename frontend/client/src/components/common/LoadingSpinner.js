import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap } from 'lucide-react';

const LoadingSpinner = ({ size = 'default', text = 'Loading...', showIcons = true }) => {
  const sizes = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
    xl: 'text-xl'
  };

  const icons = [Trophy, Target, Zap];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Spinner */}
      <motion.div
        className={`${sizes[size]} bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-2xl mb-4`}
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Trophy className={`${iconSizes[size]} text-white`} />
      </motion.div>

      {/* Floating Icons */}
      {showIcons && (
        <div className="relative">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-primary-400/40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                x: [0, (index - 1) * 20, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${50 + (index - 1) * 20}%`,
                top: '50%'
              }}
            >
              <Icon className={`${iconSizes[size]}`} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading Text */}
      <motion.p
        className={`${textSizes[size]} text-gray-600 font-medium text-center`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {text}
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        className="w-32 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 