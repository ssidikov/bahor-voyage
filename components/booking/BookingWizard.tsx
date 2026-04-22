'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';

import { useSearchParams, useRouter } from 'next/navigation';

// Ce composant nécessite des dates réelles venant de l'API.
// Il gère la sélection du circuit, de la date, le nombre de passagers,
// les infos de contact, et la redirection vers Stripe Checkout.

type TourOption = {
  id: string;
  nameFr: string;
  nameEn: string;
  price: number;
  type: string;
};

type TourDate = {
  id: string;
  tourId: string;
  startDate: string;
  endDate: string;
  price: number;
  maxSeats: number;
  bookedSeats: number;
  tour: {
    slug: string;
    titleFr: string;
    titleEn: string;
    options?: TourOption[];
  };
};

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourSlug = searchParams?.get('tour');

  const locale = useLocale() as 'fr' | 'en';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);

  // Form State
  const [selectedDateId, setSelectedDateId] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >({});
  const [passengers, setPassengers] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [travelers, setTravelers] = useState<
    { firstName: string; lastName: string; email: string }[]
  >([]);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await fetch('/api/tours/dates');
        if (res.ok) {
          const data = await res.json();
          let dates = data.dates || [];
          if (tourSlug) {
            dates = dates.filter((d: TourDate) => d.tour.slug === tourSlug);
          }
          setTourDates(dates);

          // Auto-select if only one date is available and not full
          if (dates.length === 1) {
            const date = dates[0];
            const seatsLeft = date.maxSeats - date.bookedSeats;
            if (seatsLeft > 0) {
              setSelectedDateId(date.id);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load dates', err);
      } finally {
        setLoadingDates(false);
      }
    }
    fetchDates();
  }, [tourSlug]);

  // Update travelers array when passengers changes
  useEffect(() => {
    if (passengers > 1) {
      setTravelers((prev) => {
        const count = passengers - 1;
        const next = [...prev];
        if (next.length < count) {
          for (let i = next.length; i < count; i++) {
            next.push({ firstName: '', lastName: '', email: '' });
          }
        } else if (next.length > count) {
          return next.slice(0, count);
        }
        return next;
      });
    } else {
      setTravelers([]);
    }
  }, [passengers]);

  const selectedDate = tourDates.find((d) => d.id === selectedDateId);
  const availableSeats = selectedDate
    ? selectedDate.maxSeats - selectedDate.bookedSeats
    : 0;

  const optionsTotal = Object.entries(selectedOptions).reduce(
    (sum, [optId, qty]) => {
      const opt = selectedDate?.tour.options?.find((o) => o.id === optId);
      return sum + (opt ? opt.price * qty : 0);
    },
    0,
  );

  const grandTotal = passengers * (selectedDate?.price || 0) + optionsTotal;

  const handleOptionChange = (optId: string, delta: number) => {
    setSelectedOptions((prev) => {
      const current = prev[optId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[optId];
        return copy;
      }
      return { ...prev, [optId]: next };
    });
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourDateId: selectedDateId,
          options: selectedOptions,
          passengers,
          firstName,
          lastName,
          email,
          phone,
          message,
          travelers,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      // Redirect to Stripe
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      );
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
      setCheckoutLoading(false);
    }
  };

  const handleTestCheckout = async () => {
    setCheckoutLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourDateId: selectedDateId,
          options: selectedOptions,
          passengers,
          firstName,
          lastName,
          email,
          phone,
          message,
          travelers,
        }),
      });

      if (res.ok) {
        // En cas de succès du test, redirection directe vers la page de succès
        router.push(`/booking/success?bookingId=test`);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Test checkout failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCheckoutLoading(false);
    }
  };

  if (loadingDates) {
    return (
      <div className="text-center p-10">
        {locale === 'fr' ? 'Chargement...' : 'Loading...'}
      </div>
    );
  }

  const stepVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  return (
    <div className="bg-white rounded-3xl border border-border-soft p-8 md:p-10 shadow-sm max-w-3xl mx-auto">
      {/* STEPS INDICATOR */}
      <div className="pb-6 mb-8">
        <div className="flex justify-between mb-3">
          {[
            locale === 'fr' ? 'Date' : 'Date',
            locale === 'fr' ? 'Informations' : 'Details',
            locale === 'fr' ? 'Paiement' : 'Payment',
          ].map((label, i) => (
            <div
              key={i}
              className={`text-sm transition-colors duration-300 ${
                step >= i + 1
                  ? 'text-primary-500 font-bold'
                  : 'text-charcoal-300'
              }`}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>
        {/* Animated progress bar */}
        <div className="h-1 bg-sand-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-400 rounded-full"
            animate={{ width: `${((step - 1) / 2) * 100 + 50}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* ANIMATED STEPS */}
      <AnimatePresence mode="wait">
        {/* STEP 1: SELECT DATE */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-charcoal-700">
              {locale === 'fr'
                ? 'Choisissez une date de départ'
                : 'Choose a departure date'}
            </h2>

            {tourDates.length === 0 ? (
              <p className="text-charcoal-400">
                {locale === 'fr'
                  ? "Aucun départ n'est programmé actuellement."
                  : 'No departures scheduled currently.'}
              </p>
            ) : (
              <div className="grid gap-4">
                {tourDates.map((date) => {
                  const title =
                    locale === 'fr' ? date.tour.titleFr : date.tour.titleEn;
                  const formatOpts: Intl.DateTimeFormatOptions = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  };
                  const start = new Date(date.startDate).toLocaleDateString(
                    locale,
                    formatOpts,
                  );
                  const end = new Date(date.endDate).toLocaleDateString(
                    locale,
                    formatOpts,
                  );
                  const seatsLeft = date.maxSeats - date.bookedSeats;
                  const isFull = seatsLeft <= 0;

                  return (
                    <button
                      key={date.id}
                      onClick={() => !isFull && setSelectedDateId(date.id)}
                      disabled={isFull}
                      className={`text-left p-5 rounded-2xl border transition-all ${
                        selectedDateId === date.id
                          ? 'border-primary-400 bg-primary-50 ring-1 ring-primary-400'
                          : isFull
                            ? 'opacity-50 border-border-soft bg-sand-50 cursor-not-allowed'
                            : 'border-border-soft hover:border-primary-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-charcoal-700">
                            {title}
                          </h3>
                          <p className="text-charcoal-500 mt-1">
                            {start} — {end}
                          </p>
                          <p className="text-sm font-medium mt-2 text-primary-500">
                            {isFull
                              ? locale === 'fr'
                                ? 'Complet'
                                : 'Sold out'
                              : locale === 'fr'
                                ? `${seatsLeft} places restantes`
                                : `${seatsLeft} seats left`}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-medium text-charcoal-700">
                            {date.price} €
                          </span>
                          <p className="text-xs text-charcoal-400">/ pers.</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={!selectedDateId}
                className="px-6 py-3 bg-charcoal-700 hover:bg-charcoal-800 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locale === 'fr' ? 'Continuer' : 'Continue'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && selectedDate && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-charcoal-700">
              {locale === 'fr' ? 'Vos informations' : 'Your details'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-600 mb-1">
                  {locale === 'fr'
                    ? 'Nombre de voyageurs'
                    : 'Number of travelers'}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none bg-sand-50"
                >
                  {Array.from({ length: Math.min(availableSeats, 10) }).map(
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-1">
                    {locale === 'fr' ? 'Prénom' : 'First Name'}
                  </label>
                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-soft bg-sand-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-1">
                    {locale === 'fr' ? 'Nom' : 'Last Name'}
                  </label>
                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-soft bg-sand-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-soft bg-sand-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-1">
                    {locale === 'fr' ? 'Téléphone' : 'Phone'}
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-soft bg-sand-50"
                  />
                </div>
              </div>

              {/* ADDITIONAL TRAVELERS */}
              {travelers.length > 0 && (
                <div className="space-y-6 pt-4 border-t border-border-soft">
                  <h3 className="font-medium text-charcoal-700">
                    {locale === 'fr' ? 'Autres voyageurs' : 'Other travelers'}
                  </h3>
                  {travelers.map((traveler, idx) => (
                    <div
                      key={idx}
                      className="space-y-4 p-4 rounded-2xl bg-sand-50/50 border border-border-soft"
                    >
                      <p className="text-sm font-medium text-primary-500 uppercase tracking-wider">
                        {locale === 'fr'
                          ? `Voyageur ${idx + 2}`
                          : `Traveler ${idx + 2}`}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-600 mb-1">
                            {locale === 'fr' ? 'Prénom' : 'First Name'}
                          </label>
                          <input
                            required
                            type="text"
                            value={traveler.firstName}
                            onChange={(e) => {
                              setTravelers((prev) =>
                                prev.map((t, i) =>
                                  i === idx
                                    ? { ...t, firstName: e.target.value }
                                    : t,
                                ),
                              );
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-600 mb-1">
                            {locale === 'fr' ? 'Nom' : 'Last Name'}
                          </label>
                          <input
                            required
                            type="text"
                            value={traveler.lastName}
                            onChange={(e) => {
                              setTravelers((prev) =>
                                prev.map((t, i) =>
                                  i === idx
                                    ? { ...t, lastName: e.target.value }
                                    : t,
                                ),
                              );
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-600 mb-1">
                          Email ({locale === 'fr' ? 'Optionnel' : 'Optional'})
                        </label>
                        <input
                          type="email"
                          value={traveler.email}
                          onChange={(e) => {
                            setTravelers((prev) =>
                              prev.map((t, i) =>
                                i === idx ? { ...t, email: e.target.value } : t,
                              ),
                            );
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CUSTOM MESSAGE */}
              <div className="pt-4 border-t border-border-soft">
                <label className="block text-sm font-medium text-charcoal-600 mb-1">
                  {locale === 'fr'
                    ? 'Message ou demandes particulières'
                    : 'Message or special requests'}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-soft bg-sand-50 h-32"
                  placeholder={
                    locale === 'fr'
                      ? 'Avez-vous des allergies, des besoins spécifiques...'
                      : 'Do you have any allergies, specific needs...'
                  }
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-border-soft text-charcoal-600 rounded-full font-medium"
              >
                Retour
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(3)}
                disabled={
                  !firstName ||
                  !lastName ||
                  !email ||
                  !phone ||
                  travelers.some((t) => !t.firstName || !t.lastName)
                }
                className="px-6 py-3 bg-charcoal-700 hover:bg-charcoal-800 text-white rounded-full font-medium disabled:opacity-50"
              >
                {locale === 'fr'
                  ? 'Continuer vers le paiement'
                  : 'Continue to Payment'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: OPTIONS & CHECKOUT */}
        {step === 3 && selectedDate && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-charcoal-700">
              {locale === 'fr' ? 'Options & Paiement' : 'Options & Payment'}
            </h2>

            {selectedDate.tour.options &&
              selectedDate.tour.options.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-charcoal-700">
                    {locale === 'fr'
                      ? 'Options disponibles'
                      : 'Available options'}
                  </h3>
                  {selectedDate.tour.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex items-center justify-between p-4 bg-white border border-border-soft rounded-xl"
                    >
                      <div>
                        <div className="font-medium">
                          {locale === 'fr' ? opt.nameFr : opt.nameEn}
                        </div>
                        <div className="text-sm text-charcoal-500">
                          +{opt.price} €
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleOptionChange(opt.id, -1)}
                          className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center hover:bg-sand-50"
                        >
                          -
                        </button>
                        <span className="w-4 text-center font-medium">
                          {selectedOptions[opt.id] || 0}
                        </span>
                        <button
                          onClick={() => handleOptionChange(opt.id, 1)}
                          className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center hover:bg-sand-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            <div className="p-6 bg-sand-50 rounded-2xl border border-border-soft space-y-4">
              <h3 className="font-medium text-lg text-charcoal-700">
                {locale === 'fr'
                  ? selectedDate.tour.titleFr
                  : selectedDate.tour.titleEn}
              </h3>
              <div className="flex justify-between text-charcoal-500">
                <span>
                  {new Date(selectedDate.startDate).toLocaleDateString(locale)}{' '}
                  — {new Date(selectedDate.endDate).toLocaleDateString(locale)}
                </span>
              </div>
              <div className="flex justify-between text-charcoal-500">
                <span>
                  {passengers} {locale === 'fr' ? 'voyageur(s)' : 'traveler(s)'}{' '}
                  x {selectedDate.price} €
                </span>
                <span>{passengers * selectedDate.price} €</span>
              </div>

              {optionsTotal > 0 && (
                <div className="flex justify-between text-charcoal-500">
                  <span>Options supplémentaires</span>
                  <span>{optionsTotal} €</span>
                </div>
              )}

              <div className="border-t border-border-soft pt-4 mt-4 flex justify-between font-bold text-lg text-primary-600">
                <span>Total</span>
                <span>{grandTotal} €</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="w-full md:w-auto px-6 py-3 border border-border-soft text-charcoal-600 rounded-full font-medium"
              >
                Retour
              </motion.button>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                {process.env.NODE_ENV === 'development' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTestCheckout}
                    disabled={checkoutLoading}
                    className="px-6 py-3 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-full font-medium transition-colors border border-amber-200"
                  >
                    Test Payment (No Stripe)
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: checkoutLoading ? 1 : 1.02 }}
                  whileTap={{ scale: checkoutLoading ? 1 : 0.98 }}
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="px-8 py-3 bg-primary-400 hover:bg-primary-500 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  {checkoutLoading && (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  )}
                  {checkoutLoading
                    ? locale === 'fr'
                      ? 'Redirection...'
                      : 'Redirecting...'
                    : locale === 'fr'
                      ? 'Payer en ligne'
                      : 'Pay Online'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
