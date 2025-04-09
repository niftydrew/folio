"use client";
import React from "react";

export const Footer = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800">
      Copyright © {new Date().getFullYear()} 0xDrew. All rights reserved.
    </div>
  );
};
