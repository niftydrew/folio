'use client';
import { Blog } from '@/types/blog';
import Image from 'next/image';
import React, { useState } from 'react';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

interface BlogsPreviewProps {
  blogs: Blog[];
  limit?: number;
}

export const BlogsPreview = ({ blogs, limit }: BlogsPreviewProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div>
      <div className='max-w-5xl mx-auto'>
        {displayBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Link
              key={`blog-${blog.title}`}
              href={`/blog/${blog.slug}`}
              className='relative my-6 block'
              onMouseEnter={() => setHovered(blog.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatePresence mode='wait'>
                {hovered === blog.slug && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scaleX: 0.95,
                      scaleY: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1.05,
                      scaleY: 1.2,
                    }}
                    exit={{
                      opacity: 0,
                      scaleX: 0.95,
                      scaleY: 0.95,
                    }}
                    className='absolute z-0 pointer-events-none bg-gray-50 dark:bg-neutral-800/50 inset-0 h-full w-full rounded-md'
                  />
                )}
              </AnimatePresence>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 relative z-20'>
                <Image
                  src={blog.image}
                  alt='thumbnail'
                  height='200'
                  width='200'
                  objectFit='cover'
                  className='rounded-md object-cover h-40 w-60'
                />
                <div className='flex flex-col col-span-3'>
                  <Heading className='text-lg md:text-lg lg:text-lg'>
                    {blog.title}
                  </Heading>
                  <Paragraph className='text-sm md:text-sm lg:text-sm mt-2'>
                    {blog.description}
                  </Paragraph>
                  <div className='flex space-x-2 flex-wrap mt-4'>
                    {blog.tags?.map((tag, index) => (
                      <span
                        key={`tag-${blog.slug}-${index}`}
                        className='text-xs px-1 py-0.5 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-md'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {limit && blogs.length > limit && (
        <div className='mt-8'>
          <Link
            href='/blog'
            className='inline-flex items-center text-neutral-800 dark:text-neutral-200 hover:gap-2 hover:text-neutral-600 dark:hover:text-neutral-400 font-medium transition-all'
          >
            <span className='underline underline-offset-4'>
              View All Articles
            </span>
            <FaArrowRightLong className='ml-1.5' />
          </Link>
        </div>
      )}
    </div>
  );
};
