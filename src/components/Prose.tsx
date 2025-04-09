import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-sm prose-blue max-w-none prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-headings:text-neutral-900 dark:prose-headings:text-white prose-strong:text-neutral-900 dark:prose-strong:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-black dark:prose-code:text-white prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-800 dark:prose-pre:text-neutral-300 prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-ol:text-neutral-700 dark:prose-ol:text-neutral-300 prose-ul:text-neutral-700 dark:prose-ul:text-neutral-300"
      )}
    >
      {children}
    </div>
  );
}
