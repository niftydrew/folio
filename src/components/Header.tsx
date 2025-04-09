"use client";

import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import localFont from "next/font/local";

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
    // Format time as HH:MM:SS UTC
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}:${seconds} UTC`);
  };

  return (
    <header className={twMerge(
      switzer.className,
      "w-full py-2 px-4 bg-white border-b border-neutral-200"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 py-1 px-3 bg-green-50 rounded-full border border-green-100">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs text-green-800 font-medium">Available for work</span>
          </div>
        </div>
        <div className="text-sm text-neutral-600 font-medium">
          {currentTime}
        </div>
      </div>
    </header>
  );
};
