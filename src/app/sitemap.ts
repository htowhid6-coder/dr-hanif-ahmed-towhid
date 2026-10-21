import { MetadataRoute } from 'next';
import { diseaseData } from '@/locales/diseaseData';
import { detailedSymptomsList } from '@/data/symptomsData';
import { blogData } from '@/locales/blogData';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drhaniftowhid.com';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diseases`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/symptoms`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const diseaseRoutes: MetadataRoute.Sitemap = diseaseData.map((disease) => ({
    url: `${baseUrl}/diseases/${disease.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const symptomRoutes: MetadataRoute.Sitemap = detailedSymptomsList.map((symptom) => ({
    url: `${baseUrl}/symptoms/${symptom.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Map to hold unique blog entries by slug
  const blogMap = new Map<string, { url: string; lastModified: Date; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }>();

  // 1. First add local blog posts from blogData
  for (const post of blogData) {
    if (post.slug) {
      blogMap.set(post.slug, {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // 2. Fetch live published posts from Supabase database (dynamic auto-indexing)
  try {
    const { data: dbPosts, error } = await supabase
      .from('posts')
      .select('slug, updated_at, created_at, is_published')
      .eq('is_published', true);

    if (!error && dbPosts && dbPosts.length > 0) {
      for (const p of dbPosts) {
        if (p.slug) {
          const modDate = p.updated_at ? new Date(p.updated_at) : (p.created_at ? new Date(p.created_at) : lastModified);
          blogMap.set(p.slug, {
            url: `${baseUrl}/blog/${p.slug}`,
            lastModified: isNaN(modDate.getTime()) ? lastModified : modDate,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
  } catch (err) {
    console.error('Sitemap dynamic database fetch error:', err);
  }

  const blogRoutes: MetadataRoute.Sitemap = Array.from(blogMap.values());

  return [...staticRoutes, ...diseaseRoutes, ...symptomRoutes, ...blogRoutes];
}

