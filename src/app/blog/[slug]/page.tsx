import { blogData } from '@/locales/blogData';
import BlogPostDetailClient from './BlogPostDetailClient';

export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  return <BlogPostDetailClient />;
}
