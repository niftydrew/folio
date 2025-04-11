import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { TechStack } from '@/components/TechStack';
import TestimonialCloud from '@/components/TestimonialCloud';
import Image from 'next/image';
import LogoCloud from '@/components/logo-cloud';
import { BlogsPreview } from '@/components/BlogsPreview';
import { getAllBlogs } from '../../lib/getAllBlogs';

export default async function Home() {
  const blogs = await getAllBlogs();
  const blogData = blogs.map(({ component, ...meta }) => meta);
  return (
    <Container>
      <Image
        src='/profile/pfp.png'
        alt='Avatar'
        height='100'
        width='100'
        className='object-cover object-top rounded-full flex-shrink-0'
      />
      <Heading className='mt-6 lg:text-[42px] lg:leading-[110%]'>
        Hey, I&apos;m Andrew.
      </Heading>
      <Heading className='lg:text-[42px] lg:leading-[110%]'>
        Designer & Developer
      </Heading>
      <Paragraph className='max-w-xl mt-4'>
        Leveraging 6+ years across both{' '}
        <Highlight>design and development</Highlight>, I specialize in
        transforming <Highlight>complex challenges</Highlight> into elegant,{' '}
        <Highlight>user-focused</Highlight> web solutions, from initial concept
        to <Highlight>polished code</Highlight>.
      </Paragraph>
      <LogoCloud />
      <Heading
        as='h2'
        className='font-semibold text-lg md:text-lg lg:text-2xl mt-20 mb-4'
      >
        What I&apos;ve been working on
      </Heading>
      <Products limit={4} />

      <Heading
        as='h2'
        className='font-semibold text-lg md:text-lg lg:text-2xl mt-20 mb-4'
      >
        Latest articles
      </Heading>
      <BlogsPreview blogs={blogData} limit={3} />

      <TestimonialCloud />
      <TechStack />
    </Container>
  );
}
