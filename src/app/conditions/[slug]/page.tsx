import { diseaseData } from '@/locales/diseaseData';
import ConditionDetailClient from './ConditionDetailClient';

export function generateStaticParams() {
  return diseaseData.map((disease) => ({
    slug: disease.slug,
  }));
}

export default function ConditionPage() {
  return <ConditionDetailClient />;
}
