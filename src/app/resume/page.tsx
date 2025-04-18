import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { WorkHistory } from '@/components/WorkHistory';
import Image from 'next/image';

export default function Home() {
  return (
    <Container>
      <Heading className='mb-4'>Work History</Heading>
      <Paragraph className='max-w-xl'>
        I&apos;m a full-stack developer that loves{' '}
        <Highlight>building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <WorkHistory />
    </Container>
  );
}
