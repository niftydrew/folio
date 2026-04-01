import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export function CaseStudyMarkdown({ content }: { content: string }) {
  const html = md.render(content);

  return (
    <div
      className={[
        // base text
        '[&_p]:text-base [&_p]:leading-7 [&_p]:mb-4 [&_p]:text-neutral-700 [&_p]:dark:text-neutral-300',
        // headings
        '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-neutral-900 [&_h1]:dark:text-white [&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:leading-tight',
        '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-3',
        '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-neutral-800 [&_h3]:dark:text-neutral-100 [&_h3]:mt-6 [&_h3]:mb-2',
        // lists
        '[&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5',
        '[&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5',
        '[&_li]:text-base [&_li]:leading-7 [&_li]:text-neutral-700 [&_li]:dark:text-neutral-300',
        // hr
        '[&_hr]:my-10 [&_hr]:border-neutral-200 [&_hr]:dark:border-neutral-800',
        // strong / em
        '[&_strong]:font-semibold [&_strong]:text-neutral-900 [&_strong]:dark:text-white',
        '[&_em]:italic',
        // inline code → rose pill badge
        '[&_:not(pre)>code]:inline-flex [&_:not(pre)>code]:items-center',
        '[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:border',
        '[&_:not(pre)>code]:border-neutral-200 [&_:not(pre)>code]:dark:border-neutral-700',
        '[&_:not(pre)>code]:bg-neutral-50 [&_:not(pre)>code]:dark:bg-neutral-800/60',
        '[&_:not(pre)>code]:px-2 [&_:not(pre)>code]:py-0.5',
        '[&_:not(pre)>code]:text-xs [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:font-medium',
        '[&_:not(pre)>code]:text-rose-700 [&_:not(pre)>code]:dark:text-rose-400',
        // code blocks
        '[&_pre]:bg-neutral-100 [&_pre]:dark:bg-neutral-800 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:my-6 [&_pre]:overflow-x-auto',
        '[&_pre_code]:text-sm [&_pre_code]:font-mono [&_pre_code]:text-neutral-800 [&_pre_code]:dark:text-neutral-200',
        '[&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0',
        '[&_pre_code]:!text-neutral-800 [&_pre_code]:dark:!text-neutral-200',
        // links
        '[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:hover:underline',
        // blockquote
        '[&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300 [&_blockquote]:dark:border-neutral-600',
        '[&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_blockquote]:dark:text-neutral-400 [&_blockquote]:my-6',
        // tables — wrap in a scrollable container via the parent div approach
        '[&_table]:w-full [&_table]:text-sm [&_table]:border-collapse',
        '[&_table]:my-6 [&_table]:border [&_table]:border-neutral-200 [&_table]:dark:border-neutral-800 [&_table]:rounded-lg',
        '[&_thead]:bg-neutral-100 [&_thead]:dark:bg-neutral-800',
        '[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-neutral-900 [&_th]:dark:text-white',
        '[&_tbody]:divide-y [&_tbody]:divide-neutral-200 [&_tbody]:dark:divide-neutral-800',
        '[&_td]:px-4 [&_td]:py-3 [&_td]:text-neutral-700 [&_td]:dark:text-neutral-300',
        '[&_tr]:hover:bg-neutral-50 [&_tr]:dark:hover:bg-neutral-800/50 [&_tr]:transition-colors',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
