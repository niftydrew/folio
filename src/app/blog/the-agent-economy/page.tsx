import { BlogLayout } from '@/components/BlogLayout';
import { CaseStudyMarkdown } from '@/components/CaseStudyMarkdown';
import { getBlog } from '../../../../lib/getBlog';
import { notFound } from 'next/navigation';

export default function Page() {
  const blog = getBlog('the-agent-economy');
  if (!blog) notFound();

  return (
    <BlogLayout meta={blog.meta}>
      <CaseStudyMarkdown content={blog.content} />
    </BlogLayout>
  );
}
