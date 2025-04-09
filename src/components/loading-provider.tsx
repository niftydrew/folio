"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
import { motion, AnimatePresence } from 'framer-motion';

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle page transitions
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => {
      setLoading(false);
      setInitialLoad(false);
    };

    // Simulate initial loading
    if (initialLoad) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setInitialLoad(false);
      }, 1200); // Initial load duration
      return () => clearTimeout(timer);
    }

    // Router events equivalent in App Router
    return () => {};
  }, [pathname, searchParams, initialLoad]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm"
          >
            <Loader size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
