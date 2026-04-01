'use client';
import React from 'react';
import { Heading } from './Heading';
import { Project } from '@/types/projects';
import { projects } from '@/constants/projects';
import Link from 'next/link';
import Image from 'next/image';
import { Paragraph } from './Paragraph';
import { motion } from 'motion/react';
import { FaArrowRightLong } from 'react-icons/fa6';

interface ProjectsProps {
  limit?: number;
}

export const Projects = ({ limit }: ProjectsProps = {}) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  return (
    <div>
      <div className='grid grid-cols-1  gap-10'>
        {displayProjects.map((project: Project, idx: number) => (
          <motion.div
            key={project.href}
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
              href={project.slug ? `/projects/${project.slug}` : project.href}
              key={project.href}
              className='group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition duration-200 pt-4'
            >
              <Image
                src={project.thumbnail}
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
                    {project.title}
                  </Heading>
                  <Paragraph className='text-sm md:text-sm lg:text-base mt-2 max-w-xl line-clamp-2'>
                    {project.description}
                  </Paragraph>
                </div>
                <div className='flex space-x-2 md:mb-1 mt-2 md:mt-0'>
                  {project.stack?.map((stack: string) => (
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

      {limit && projects.length > limit && (
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
