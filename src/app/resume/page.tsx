import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { WorkHistory } from '@/components/WorkHistory';

export default function Home() {
  return (
    <Container>
      <Heading className='mb-4'>Work History</Heading>
      <Paragraph className='max-w-xl'>
        I&apos;m a full-stack developer that loves{' '}
        <Highlight>building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <div className='mt-6'>
        <Button href='/resume.html' text='View Full Resume' target='_blank' />
      </div>
      <WorkHistory />
    </Container>
  );
}
