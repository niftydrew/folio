'use client';
import React from 'react';
import { Heading } from './Heading';
import { Product } from '@/types/products';
import { products } from '@/constants/products';
import Link from 'next/link';
import Image from 'next/image';
import { Paragraph } from './Paragraph';
import { motion } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';

interface ProductsProps {
  limit?: number;
}

export const Products = ({ limit }: ProductsProps = {}) => {
  const displayProducts = limit ? products.slice(0, limit) : products;
  return (
    <div>
      <div className='grid grid-cols-1  gap-10'>
        {displayProducts.map((product: Product, idx: number) => (
          <motion.div
            key={product.href}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={product.slug ? `/projects/${product.slug}` : product.href}
              key={product.href}
              className='group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition duration-200 pt-4'
            >
              <Image
                src={product.thumbnail}
                alt='thumbnail'
                height='200'
                width='200'
                className='rounded-md'
              />
              <div className='flex flex-col justify-between'>
                <div>
                  <Heading
                    as='h4'
                    className='font-medium text-lg md:text-lg lg:text-lg '
                  >
                    {product.title}
                  </Heading>
                  <Paragraph className='text-sm md:text-sm lg:text-base mt-2 max-w-xl'>
                    {product.description}
                  </Paragraph>
                </div>
                <div className='flex space-x-2 md:mb-1 mt-2 md:mt-0'>
                  {product.stack?.map((stack: string) => (
                    <span
                      key={stack}
                      className='text-xs md:text-xs lg:text-xs bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded-sm text-neutral-600 dark:text-neutral-300'
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {limit && products.length > limit && (
        <div className='mt-8'>
          <Link
            href='/projects'
            className='inline-flex items-center text-neutral-800 dark:text-neutral-200 hover:gap-2 hover:text-neutral-600 dark:hover:text-neutral-400 font-medium transition-all'
          >
            <span className='underline underline-offset-4'>
              View All Projects
            </span>
            <FaArrowRightLong className='ml-1.5' />
          </Link>
        </div>
      )}
    </div>
  );
};
