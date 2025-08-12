import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card', lines = 3, className = '' }) => {
  const shimmerVariants = {
    shimmer: {
      backgroundPosition: ['-200% 0', '200% 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
              <motion.div
                className="w-full h-full shimmer"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%'
                }}
                variants={shimmerVariants}
                animate="shimmer"
              />
            </div>
            
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4">
              <motion.div
                className="w-full h-full shimmer"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%'
                }}
                variants={shimmerVariants}
                animate="shimmer"
              />
            </div>
            
            {/* Description skeleton */}
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className={`h-4 bg-gray-200 rounded-lg mb-2 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}>
                <motion.div
                  className="w-full h-full shimmer"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%'
                  }}
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
            ))}
            
            {/* Button skeleton */}
            <div className="flex space-x-3 mt-6">
              <div className="flex-1 h-10 bg-gray-200 rounded-xl">
                <motion.div
                  className="w-full h-full shimmer"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%'
                  }}
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
              <div className="flex-1 h-10 bg-gray-200 rounded-xl">
                <motion.div
                  className="w-full h-full shimmer"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%'
                  }}
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-4">
                <div className="flex items-center space-x-4">
                  {/* Avatar skeleton */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                    <motion.div
                      className="w-full h-full shimmer"
                      style={{
                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                        backgroundSize: '200% 100%'
                      }}
                      variants={shimmerVariants}
                      animate="shimmer"
                    />
                  </div>
                  
                  {/* Content skeleton */}
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-lg w-1/3">
                      <motion.div
                        className="w-full h-full shimmer"
                        style={{
                          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                          backgroundSize: '200% 100%'
                        }}
                        variants={shimmerVariants}
                        animate="shimmer"
                      />
                    </div>
                    <div className="h-3 bg-gray-200 rounded-lg w-2/3">
                      <motion.div
                        className="w-full h-full shimmer"
                        style={{
                          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                          backgroundSize: '200% 100%'
                        }}
                        variants={shimmerVariants}
                        animate="shimmer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden ${className}`}>
            {/* Header skeleton */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-5 bg-gray-200 rounded-lg">
                    <motion.div
                      className="w-full h-full shimmer"
                      style={{
                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                        backgroundSize: '200% 100%'
                      }}
                      variants={shimmerVariants}
                      animate="shimmer"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rows skeleton */}
            <div className="divide-y divide-gray-200">
              {Array.from({ length: lines }).map((_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <div key={colIndex} className={`h-4 bg-gray-200 rounded-lg ${colIndex === 0 ? 'w-3/4' : 'w-full'}`}>
                        <motion.div
                          className="w-full h-full shimmer"
                          style={{
                            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                            backgroundSize: '200% 100%'
                          }}
                          variants={shimmerVariants}
                          animate="shimmer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                {/* Icon skeleton */}
                <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4">
                  <motion.div
                    className="w-full h-full shimmer"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%'
                    }}
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
                
                {/* Number skeleton */}
                <div className="h-8 bg-gray-200 rounded-lg mb-2 w-1/2">
                  <motion.div
                    className="w-full h-full shimmer"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%'
                    }}
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
                
                {/* Label skeleton */}
                <div className="h-4 bg-gray-200 rounded-lg w-3/4">
                  <motion.div
                    className="w-full h-full shimmer"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%'
                    }}
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
            <div className="space-y-4">
              {Array.from({ length: lines }).map((_, index) => (
                <div key={index} className={`h-4 bg-gray-200 rounded-lg ${index === 0 ? 'w-3/4' : index === lines - 1 ? 'w-1/2' : 'w-full'}`}>
                  <motion.div
                    className="w-full h-full shimmer"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%'
                    }}
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return renderSkeleton();
};

export default SkeletonLoader;
