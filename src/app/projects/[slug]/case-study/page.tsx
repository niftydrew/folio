import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { CaseStudyMarkdown } from '@/components/CaseStudyMarkdown';
import { projects } from '@/constants/projects';
import { getCaseStudy } from '../../../../../lib/getCaseStudy';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Case Study` : 'Case Study',
    description: project?.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const content = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);

  if (!content || !project) {
    redirect(`/projects/${slug}`);
  }

  return (
    <Container>
      <div className='mb-6'>
        <Link
          href={`/projects/${slug}`}
          className='inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
        >
          <HiArrowLeft className='mr-2 h-4 w-4' />
          Back to {project.title}
        </Link>
      </div>
      <Heading className='font-semibold mb-2'>{project.title}</Heading>
      <p className='text-sm text-neutral-500 dark:text-neutral-400 mb-8 uppercase tracking-widest font-medium'>
        Case Study
      </p>
      <div className='mt-4'>
        <CaseStudyMarkdown content={content} />
      </div>
    </Container>
  );
}
