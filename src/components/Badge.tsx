import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Badge = ({
  text,
  href,
  ...props
}: {
  text: string;
  href: string;
  props?: React.ComponentProps<typeof Link>;
}) => {
  return (
    <Link
      href={href}
      className='bg-slate-950 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-medium leading-6 tracking-tight text-white inline-block'
      {...props}
    >
      <span className='absolute inset-0 overflow-hidden rounded-full '>
        <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(100,100,100,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
      </span>
      <div className='relative flex items-center z-10 rounded-full bg-transparent py-2 px-4 ring-1 ring-white/10 '>
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
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1.5'
            d='M10.75 8.75L14.25 12L10.75 15.25'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          ></motion.path>
        </svg>
      </div>
    </Link>
  );
};
