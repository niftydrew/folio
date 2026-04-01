import fs from 'fs';
import path from 'path';

const caseStudiesDir = path.join(process.cwd(), 'content/case-studies');

export function getCaseStudy(slug: string): string | null {
  const filePath = path.join(caseStudiesDir, `${slug}.md`);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export function hasCaseStudy(slug: string): boolean {
  const filePath = path.join(caseStudiesDir, `${slug}.md`);
  return fs.existsSync(filePath);
}
