import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { TechStack } from '@/components/TechStack';
import Image from 'next/image';

export default function Home() {
  return (
    <Container>
      <Image
        src='/profile/pfp.png'
        alt='Avatar'
        height='100'
        width='100'
        className='object-cover object-top rounded-full flex-shrink-0'
      />
      <Heading className='mt-6'>Hey, I&apos;m Andrew.</Heading>
      <Heading>Designer & Developer</Heading>
      <Paragraph className='max-w-xl mt-4'>
        Leveraging 6+ years across both{' '}
        <Highlight>design and development</Highlight>, I specialize in
        transforming <Highlight>complex challenges</Highlight> into elegant, <Highlight>user-focused</Highlight> web
        solutions, from initial concept to <Highlight>polished code</Highlight>.
      </Paragraph>
      <Heading
        as='h2'
        className='font-semibold text-lg md:text-lg lg:text-2xl mt-20 mb-4'
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
