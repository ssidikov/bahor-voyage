'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

type BookingDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passengers: number;
  totalAmount: number;
  paymentStatus: string;
  tourDate: {
    startDate: string;
    endDate: string;
    tour: {
      titleFr: string;
      titleEn: string;
    };
  };
};

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale() as 'fr' | 'en';
  const t = useTranslations('booking_success');

  const bookingId = searchParams?.get('bookingId');
  const sessionId = searchParams?.get('session_id');
  const isTest = bookingId === 'test';

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If it's a real Stripe session, fetch booking by session_id (client_reference_id)
    // If test mode, show a mock confirmation
    async function fetchBooking() {
      if (isTest) {
        // Mock data for test mode
        setBooking(null);
        setLoading(false);
        return;
      }

      if (!sessionId && !bookingId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const param = sessionId
          ? `session_id=${sessionId}`
          : `booking_id=${bookingId}`;
        const res = await fetch(`/api/bookings/confirmation?${param}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data.booking);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [sessionId, bookingId, isTest, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-2 border-primary-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">⚠️</div>
          <h2 className="font-serif text-2xl text-charcoal-700 mb-3">
            {t('error_title')}
          </h2>
          <p className="text-charcoal-500 mb-8">{t('error_body')}</p>
          <Link
            href={`/${locale}/contact`}
            className="px-6 py-3 bg-charcoal-700 text-white rounded-full font-medium hover:bg-charcoal-800 transition-colors"
          >
            {t('cta_contact')}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const tourTitle = booking
    ? locale === 'fr'
      ? booking.tourDate.tour.titleFr
      : booking.tourDate.tour.titleEn
    : null;

  return (
    <div className="bg-sand-50 min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 18,
            delay: 0.1,
          }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="w-12 h-12 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path d="M5 13l4 4L19 7" />
              </motion.svg>
            </div>
            {/* Pulse ring */}
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-green-200"
            />
          </div>
        </motion.div>

        {/* Test badge */}
        {isTest && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
              {t('test_badge')}
            </span>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-label uppercase tracking-[0.15em] text-primary-500 mb-3">
            {t('kicker')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal-800 font-light mb-4">
            {t('title')}
          </h1>
          <p className="text-charcoal-500 text-lg">{t('subtitle')}</p>
        </motion.div>

        {/* Booking details card */}
        {booking && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl border border-border-soft shadow-sm p-8 mb-8"
          >
            <div className="space-y-4">
              {/* Tour */}
              <div className="flex justify-between items-start py-3 border-b border-border-soft">
                <span className="text-sm text-charcoal-500">
                  {t('detail_tour')}
                </span>
                <span className="font-medium text-charcoal-800 text-right max-w-xs">
                  {tourTitle}
                </span>
              </div>

              {/* Dates */}
              <div className="flex justify-between items-start py-3 border-b border-border-soft">
                <span className="text-sm text-charcoal-500">
                  {t('detail_dates')}
                </span>
                <span className="font-medium text-charcoal-800 text-right">
                  {formatDate(booking.tourDate.startDate)} →{' '}
                  {formatDate(booking.tourDate.endDate)}
                </span>
              </div>

              {/* Passengers */}
              <div className="flex justify-between items-center py-3 border-b border-border-soft">
                <span className="text-sm text-charcoal-500">
                  {t('detail_passengers')}
                </span>
                <span className="font-medium text-charcoal-800">
                  {booking.passengers}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-3 border-b border-border-soft">
                <span className="text-sm text-charcoal-500">
                  {t('detail_total')}
                </span>
                <span className="text-xl font-bold text-primary-600">
                  {booking.totalAmount} €
                </span>
              </div>

              {/* Reference */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-charcoal-500">
                  {t('detail_ref')}
                </span>
                <span className="font-mono text-xs bg-sand-50 border border-border-soft px-3 py-1.5 rounded-lg text-charcoal-600">
                  {booking.id.slice(-10).toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white rounded-3xl border border-border-soft shadow-sm p-8 mb-10"
        >
          <h2 className="font-serif text-lg text-charcoal-700 mb-6">
            {t('next_steps_title')}
          </h2>
          <div className="space-y-4">
            {[t('next_step_1'), t('next_step_2'), t('next_step_3')].map(
              (step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-charcoal-600 leading-relaxed">{step}</p>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={`/${locale}/circuits`}
            className="px-8 py-3.5 bg-charcoal-700 hover:bg-charcoal-800 text-white rounded-full font-medium text-center transition-colors"
          >
            {t('cta_tours')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="px-8 py-3.5 border border-border-soft text-charcoal-600 hover:border-charcoal-400 rounded-full font-medium text-center transition-colors"
          >
            {t('cta_contact')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
