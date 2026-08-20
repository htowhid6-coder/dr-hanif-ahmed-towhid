import { blogData } from '@/locales/blogData';
import BlogPostDetailClient from './BlogPostDetailClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  return <BlogPostDetailClient />;
}

