'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 w-full py-12 px-6 md:px-12 bg-footer-bg backdrop-blur-[10px] border-t border-line text-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white">
            {t('footer.title')}
          </span>
          <span className="text-[10px] text-gray-200 uppercase tracking-wider mt-1 opacity-80">
            {t('footer.tagline')}
          </span>
        </div>

        <div className="text-center text-xs text-gray-300 max-w-md">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2 text-[11px] text-gray-300 font-medium">
            Developed by{' '}
            <a
              href="https://benzadidintelligence.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white font-semibold underline underline-offset-2 transition-colors inline-block"
            >
              Benzadid Intelligence
            </a>
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex gap-6 text-xs font-semibold">
          <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
            {t('footer.privacy')}
          </Link>
          <Link href="/disclaimer" className="text-gray-300 hover:text-white transition-colors duration-200">
            Disclaimer
          </Link>
          <Link href="/portal" className="text-gray-300 hover:text-white transition-colors duration-200">
            {t('footer.patientPortal')}
          </Link>
        </nav>
      </div>
    </footer>
  );
};
