"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Loader({ size = 'md', className }: LoaderProps) {
  const dotVariants = {
    initial: { opacity: 0.3, y: 0 },
    animate: { opacity: 1, y: -5 },
  };

  const sizeMap = {
    sm: 'space-x-1',
    md: 'space-x-1.5',
    lg: 'space-x-2',
  };

  const dotSizeMap = {
    sm: 'h-1 w-1',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('flex', sizeMap[size])}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial="initial"
            animate="animate"
            variants={dotVariants}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.6,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className={cn(
              'rounded-full bg-neutral-400 dark:bg-neutral-500',
              dotSizeMap[size]
            )}
          />
        ))}
      </div>
    </div>
  );
}
