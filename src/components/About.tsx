'use client';
import { Paragraph } from '@/components/Paragraph';
import Image from 'next/image';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-10 my-10'>
        <Image
          src='https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60'
          width={200}
          height={400}
          alt='about'
          className='rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200'
        />
        <Image
          src='https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60'
          width={200}
          height={400}
          alt='about'
          className='rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200'
        />
        <Image
          src='https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          width={200}
          height={400}
          alt='about'
          className='rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200'
        />
        <Image
          src='https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          width={200}
          height={400}
          alt='about'
          className='rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200'
        />
      </div>

      <div className='max-w-4xl'>
        <Paragraph className=' mt-4'>
          Hey there, I&apos;m 0xDrew - a designer and developer with over 6
          years of experience crafting elegant, user-focused web solutions.
          Welcome to my portfolio!
        </Paragraph>
        <Paragraph className=' mt-4'>
          My journey in tech began with a passion for solving complex problems
          through code. As I&apos;ve grown, I&apos;ve developed a deep
          appreciation for the intersection of development and design. I believe
          that truly exceptional digital experiences require both technical
          excellence and thoughtful design thinking.
        </Paragraph>

        <Paragraph className=' mt-4'>
          What drives me is transforming complex challenges into intuitive,
          accessible solutions. Whether I&apos;m working with React, Next.js,
          TypeScript, or exploring new technologies, I approach each project
          with a keen eye for both functionality and user experience.
        </Paragraph>
        <Paragraph className=' mt-4'>
          My approach combines technical expertise with design sensibility. I
          focus on creating solutions that not only meet technical requirements
          but also delight users through thoughtful interaction design, clean
          aesthetics, and attention to detail.
        </Paragraph>
        <Paragraph className=' mt-4'>
          In addition to client work, I enjoy contributing to open-source
          projects and staying active in developer communities. I believe in
          continuous learning and love exploring emerging technologies that push
          the boundaries of what&apos;s possible on the web.
        </Paragraph>
        <Paragraph className=' mt-4'>
          This portfolio showcases selected projects that demonstrate my
          capabilities across both design and development. Each project
          represents a unique challenge and highlights different aspects of my
          skill set.
        </Paragraph>
        <Paragraph className=' mt-4'>
          I&apos;m always open to discussing new opportunities, collaborations,
          or just connecting with like-minded professionals. Feel free to reach
          out through the contact page if you&apos;d like to work together or
          learn more about my approach.
        </Paragraph>
      </div>
    </div>
  );
}
