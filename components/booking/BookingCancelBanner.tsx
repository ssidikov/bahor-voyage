'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingCancelBanner() {
  const searchParams = useSearchParams();
  const t = useTranslations('booking_page');
  const canceled = searchParams?.get('canceled') === 'true';
  const [dismissed, setDismissed] = useState(false);

  if (!canceled || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-lg mt-0.5">⚠</span>
            <p className="text-amber-800 text-sm leading-relaxed">
              {t('cancel_banner')}
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-500 hover:text-amber-700 transition-colors shrink-0 mt-0.5"
            aria-label={t('cancel_banner_dismiss')}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
