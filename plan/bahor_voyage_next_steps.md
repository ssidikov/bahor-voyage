# Bahor Voyage: Next Steps & Implementation Plan

Based on recent updates to the multi-traveler booking system, Prisma schema enhancements, and Stripe checkout integration, here is a structured TODO list for the upcoming tasks required to make the platform production-ready.

## 1. Complete Stripe Integration (Backend)

Currently, `app/api/checkout/route.ts` creates a Stripe session, but there is no secure way to verify payment completion.

- [ ] **Create Stripe Webhook**: Implement `app/api/webhook/route.ts` to listen for Stripe's `checkout.session.completed` event.
- [ ] **Update Booking Status**: Inside the webhook, verify the event signature and update the corresponding Prisma `Booking` record (`paymentStatus` -> `PAID`, `status` -> `CONFIRMED`).
- [ ] **Handle Failed Payments**: Optionally listen to `payment_intent.payment_failed` to update the booking status to `FAILED`.

## 2. Complete Booking Flow (Frontend)

The checkout logic redirects users upon success or cancellation, but the destination pages do not exist yet.

- [ ] **Create Success Page**: Implement `app/[locale]/booking/success/page.tsx` to handle the `/booking/success?session_id=...` redirect. It should fetch the session/booking details and display a confirmation message.
- [ ] **Create Cancel/Error Page**: Implement logic on `app/[locale]/booking/page.tsx` (or a dedicated cancel page) to handle the `?canceled=true` query parameter and display a relevant message to the user.
- [ ] **Update BookingWizard**: Ensure the test checkout path (`/booking/success?bookingId=test`) correctly lands on the new success page and displays test mock data.

## 3. Automated Email Notifications

With the test notification system already explored, it must now be connected to the real booking lifecycle.

- [ ] **Customer Confirmation Email**: Trigger an email containing the booking receipt and tour details when the Stripe webhook confirms payment.
- [ ] **Admin Notification Email**: Trigger an alert to the administrator when a new booking is confirmed or a new contact request is created.
- [ ] **Email Templates**: Design aesthetic email templates (using React Email or simple HTML) for French and English locales.

## 4. Admin Dashboard Polish

The admin dashboard now displays travelers and messages, but can be improved for daily operational use.

- [ ] **Search & Filtering**: Add search by customer name/email and filter by Tour Date or Payment Status in `app/[locale]/admin/bookings/page.tsx`.
- [ ] **Pagination**: Implement pagination for bookings and contact requests to ensure performance as data grows.
- [ ] **Export to CSV**: Add a button to export booking lists (including traveler details) for a specific tour date to give to tour guides.

## 5. UI/UX & Aesthetics Improvements

To ensure the "WOW" factor required by our design guidelines:

- [ ] **Hero Section Polish**: Review `BookingHero.tsx` and `TourIntro.tsx` to ensure high-quality imagery, smooth gradients, and modern typography (e.g., Inter/Outfit).
- [ ] **Micro-animations**: Add Framer Motion (or simple CSS transitions) to the `BookingWizard` step transitions and button hover states.
- [ ] **Responsive Design Audit**: Test the multi-traveler form on mobile devices to ensure input fields and dropdowns are easily tappable.

## 6. Internationalization (i18n)

- [ ] **Translation Audit**: Update `messages/fr.json` and `messages/en.json` to include all new strings introduced in the multi-traveler form, success page, and admin dashboard.

---

**Priority Recommendation:** Start with **Phase 1 & Phase 2** to fully close the loop on the user booking journey and ensure payments are securely recorded.
