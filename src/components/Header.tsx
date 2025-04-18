"use client";

import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import localFont from "next/font/local";
import { ThemeToggle } from './theme-toggle';

// Font files can be colocated inside of `app`
const switzer = localFont({
  src: [{ path: "../../fonts/Switzer-Variable.woff2" }],
  display: "swap",
});

export const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Initialize time
    updateTime();
    
    // Update time every second
    const interval = setInterval(() => {
      updateTime();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    // Format time as HH:MM:SS Local Time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Get timezone offset in hours and minutes
    const offset = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetString = `GMT${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
    
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  return (
    <header className={twMerge(
      switzer.className,
      "w-full py-2 px-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 py-1 px-3 bg-green-50 dark:bg-green-950 rounded-full border border-green-100 dark:border-green-900">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs text-green-800 dark:text-green-300 font-medium">Available for work</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
            {currentTime}
          </div>
        </div>
      </div>
    </header>
  );
};
