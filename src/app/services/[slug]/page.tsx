import { servicesData } from '@/locales/diseaseData';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage() {
  return <ServiceDetailClient />;
}
