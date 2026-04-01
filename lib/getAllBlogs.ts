import { getAllBlogSlugs, getBlog } from './getBlog';

export async function getAllBlogs() {
  const slugs = getAllBlogSlugs();

  const blogs = slugs
    .map((slug) => {
      const blog = getBlog(slug);
      if (!blog) return null;
      return { slug, ...blog.meta };
    })
    .filter(Boolean);

  return blogs.sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
