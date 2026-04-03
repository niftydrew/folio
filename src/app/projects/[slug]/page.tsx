import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { SingleProject } from '@/components/Project';
import { Projects } from '@/components/Projects';
import { projects } from '@/constants/projects';
import { Project } from '@/types/projects';
import { hasCaseStudy } from '../../../../lib/getCaseStudy';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) as Project | undefined;
  if (project) {
    return {
      title: project.title,
      description: project.description,
    };
  } else {
    return {
      title: 'Projects | Akyampong',
      description:
        'Explore projects by Akyampong, a Designer & Developer with 8+ years experience creating elegant, user-focused web solutions using React, Next.js, TypeScript and more.',
    };
  }
}

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    redirect('/projects');
  }
  return (
    <Container>
      <div className='mb-6'>
        <Link
          href='/projects'
          className='inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
        >
          <HiArrowLeft className='mr-2 h-4 w-4' />
          Back to Projects
        </Link>
      </div>
      <SingleProject project={project} hasCaseStudy={hasCaseStudy(slug)} />
    </Container>
  );
}
