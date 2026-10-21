import { Metadata } from 'next';
import { detailedSymptomsList } from '@/data/symptomsData';
import SymptomDetailClient from './SymptomDetailClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return detailedSymptomsList.map((symptom) => ({
    slug: symptom.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptom = detailedSymptomsList.find((s) => s.slug === slug);

  if (!symptom) {
    return {
      title: 'লক্ষণ নির্দেশিকা | ডা. হানিফ আহমেদ তৌহিদ',
      description: 'মেডিসিন বিশেষজ্ঞ ডা. হানিফ আহমেদ তৌহিদের লক্ষণ ভিত্তিক স্বাস্থ্য পরামর্শ ও ক্লিনিকাল গাইডলাইন।',
    };
  }

  const title = `${symptom.titleBn} (${symptom.titleEn}) - কারণ, লক্ষণ ও চিকিৎসা | ডা. হানিফ আহমেদ তৌহিদ`;
  const description = `${symptom.shortDescBn} সিলেটে মেডিসিন বিশেষজ্ঞ ডা. হানিফ আহমেদ তৌহিদের নির্ভরযোগ্য চিকিৎসা পরামর্শ ও সিরিয়াল বুকিং।`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://drhaniftowhid.com/symptoms/${slug}`,
      siteName: 'Dr. Hanif Ahmed Towhid - Medicine Specialist',
      images: [
        {
          url: symptom.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: symptom.titleEn,
        },
      ],
      locale: 'bn_BD',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [symptom.image || '/og-image.jpg'],
    },
    alternates: {
      canonical: `https://drhaniftowhid.com/symptoms/${slug}`,
    },
  };
}

export default function SymptomDetailPage() {
  return <SymptomDetailClient />;
}
