'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Heading } from './Heading';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';

export const TechStack = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After hydration, we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolved theme to handle system preference
  const currentTheme = resolvedTheme || theme;
  const stack = [
    {
      title: 'Next.js',
      src_light: '/images/logos/next-light.svg',
      src_dark: '/images/logos/next-dark.svg',
      className: 'h-8 w-8',
      url: 'https://nextjs.org/',
    },
    {
      title: 'TypeScript',
      src_light: '/images/logos/typescript.svg',
      src_dark: '/images/logos/typescript.svg',
      className: 'h-8 w-8',
      url: 'https://www.typescriptlang.org/',
    },
    {
      title: 'Bun.js',
      src_light: '/images/logos/bunjs-light.svg',
      src_dark: '/images/logos/bunjs-dark.svg',
      className: 'h-8 w-8',
      url: 'https://bun.sh/',
    },
    {
      title: 'npm',
      src_light: '/images/logos/npm-light.svg',
      src_dark: '/images/logos/npm-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.npmjs.com/',
    },
    {
      title: 'Tailwind CSS',
      src_light: '/images/logos/tailwindcss-light.svg',
      src_dark: '/images/logos/tailwindcss-dark.svg',
      className: 'h-8 w-8',
      url: 'https://tailwindcss.com/',
    },
    {
      title: 'PostgreSQL',
      src_light: '/images/logos/postgresql-light.svg',
      src_dark: '/images/logos/postgresql-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.postgresql.org/',
    },
    {
      title: 'MongoDB',
      src_light: '/images/logos/mongodb-light.svg',
      src_dark: '/images/logos/mongodb-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.mongodb.com/',
    },
    {
      title: 'Supabase',
      src_light: '/images/logos/supabase-light.svg',
      src_dark: '/images/logos/supabase-dark.svg',
      className: 'h-8 w-8',
      url: 'https://supabase.com/',
    },
    {
      title: 'Node',
      src_light: '/images/logos/nodejs-light.svg',
      src_dark: '/images/logos/nodejs-dark.svg',
      className: 'h-8 w-8',
      url: 'https://nodejs.org/',
    },
    {
      title: 'Prisma',
      src_light: '/images/logos/prisma-light.svg',
      src_dark: '/images/logos/prisma-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.prisma.io/',
    },
    {
      title: 'Zod',
      src_light: '/images/logos/zod.svg',
      src_dark: '/images/logos/zod.svg',
      className: 'h-8 w-8',
      url: 'https://zod.dev/',
    },
    {
      title: 'Mocha.js',
      src_light: '/images/logos/mochajs-light.svg',
      src_dark: '/images/logos/mochajs-dark.svg',
      className: 'h-8 w-8',
      url: 'https://mochajs.org/',
    },
    {
      title: 'Git',
      src_light: '/images/logos/git-light.svg',
      src_dark: '/images/logos/git-dark.svg',
      className: 'h-8 w-8',
      url: 'https://git-scm.com/',
    },
    {
      title: 'Cloudflare',
      src_light: '/images/logos/cloudflare-light.svg',
      src_dark: '/images/logos/cloudflare-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.cloudflare.com/',
    },
    {
      title: 'Figma',
      src_light: '/images/logos/figma-light.svg',
      src_dark: '/images/logos/figma-dark.svg',
      className: 'h-8 w-8',
      url: 'https://www.figma.com/',
    },
    
  ];
  return (
    <div>
      <Heading
        as='h2'
        className='text-lg md:text-lg lg:text-2xl mt-20 mb-4'
      >
        Tech Stack
      </Heading>
      <div className='flex flex-wrap'>
        {stack.map((item) => (
          <div
            key={item.src_light}
            className='mr-4 mb-4 px-3 py-2 flex items-center justify-center relative group'
          >
            <Link 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Image
                src={
                  mounted && currentTheme === 'dark'
                    ? item.src_dark
                    : item.src_light
                }
                width={`100`}
                height={`100`}
                alt={item.title}
                className={twMerge('object-contain', item.className)}
              />
            </Link>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
