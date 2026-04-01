import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'content/articles');

function parseFrontmatter(raw: string): { meta: Record<string, any>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, any> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const raw = line.slice(colonIdx + 1).trim();
    if (raw.startsWith('[')) {
      try {
        meta[key] = JSON.parse(raw.replace(/'/g, '"'));
      } catch {
        meta[key] = raw;
      }
    } else {
      meta[key] = raw.replace(/^['"]|['"]$/g, '');
    }
  }

  return { meta, content: match[2] };
}

export function getBlog(slug: string): { meta: Record<string, any>; content: string } | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return parseFrontmatter(raw);
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    return fs
      .readdirSync(articlesDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}
