"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export const Button = ({
  text,
  onClick,
  href,
  target,
  type = "button",
  className,
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'bg-neutral-950 dark:bg-neutral-800 no-underline group cursor-pointer relative shadow-lg shadow-neutral-300/20 dark:shadow-neutral-900/30 rounded-full p-px text-sm font-medium leading-6 tracking-tight text-white inline-block';
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={`${baseStyles} ${className || ''}`}
      >
        <span className='absolute inset-0 overflow-hidden rounded-full'>
          <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(100,100,100,0.6)_0%,rgba(56,189,248,0)_75%)] dark:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(150,150,150,0.4)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
        </span>
        <div className='relative flex items-center z-10 rounded-full bg-transparent py-1.5 pl-4 pr-3 ring-1 ring-white/20 dark:ring-white/10'>
          <span>{text}</span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M10.75 8.75L14.25 12L10.75 15.25'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            ></motion.path>
          </svg>
        </div>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className || ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <span className='absolute inset-0 overflow-hidden rounded-full'>
        <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(100,100,100,0.6)_0%,rgba(56,189,248,0)_75%)] dark:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(150,150,150,0.4)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
      </span>
      <div className='relative flex items-center z-10 rounded-full bg-transparent py-1.5 pl-4 pr-3 ring-1 ring-white/20 dark:ring-white/10'>
        <span>{text}</span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M10.75 8.75L14.25 12L10.75 15.25'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          ></motion.path>
        </svg>
      </div>
    </button>
  );
};
