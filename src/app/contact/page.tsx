import { Contact } from '@/components/Contact';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact | Andrew Akyampong',
  description:
    'Get in touch with Andrew Akyampong, Designer & Developer with expertise in creating elegant, user-focused web solutions.',
  openGraph: {
    title: 'Contact | Andrew Akyampong',
    description:
      'Get in touch with Andrew Akyampong, Designer & Developer with expertise in web development and design.',
  },
  twitter: {
    title: 'Contact | Andrew Akyampong',
    description:
      'Get in touch with Andrew Akyampong, Designer & Developer with expertise in web development and design.',
  },
};

export default function Projects() {
  return (
    <Container>
      <Heading className='mb-4'>Contact Me</Heading>
      <Paragraph className='mb-10 max-w-xl'>
        Have a question or just want to chat? Fill out the
        contact form below. I&apos;ll get back to you as soon as possible.
      </Paragraph>
      <Contact />
    </Container>
  );
}
