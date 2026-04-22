# Final Implementation Plan — Bahor Voyage

> **Status after audit:** More is done than expected. The Stripe webhook, email notifications, and contact form emails are already coded. Gmail credentials are now in `.env`. Stripe credentials are not yet available.

---

## What's Already Built ✅

| Feature                          | Status  | File                                   |
| -------------------------------- | ------- | -------------------------------------- |
| Booking Wizard (3-step form)     | ✅ Done | `components/booking/BookingWizard.tsx` |
| Multi-traveler support           | ✅ Done | Schema + UI + API                      |
| Stripe Checkout session creation | ✅ Done | `app/api/checkout/route.ts`            |
| Stripe Webhook (payment confirm) | ✅ Done | `app/api/webhook/stripe/route.ts`      |
| Customer email on payment        | ✅ Done | Inside webhook                         |
| Admin email on payment           | ✅ Done | Inside webhook                         |
| Contact form + admin email       | ✅ Done | `app/api/contact/route.ts`             |
| Admin Dashboard (overview)       | ✅ Done | `app/[locale]/admin/page.tsx`          |
| Admin Bookings table             | ✅ Done | `app/[locale]/admin/bookings/page.tsx` |
| Admin Contacts CRM               | ✅ Done | `app/[locale]/admin/contacts/page.tsx` |
| Admin Circuits management        | ✅ Done | `app/[locale]/admin/circuits/page.tsx` |
| BookingHero with parallax        | ✅ Done | `components/booking/BookingHero.tsx`   |
| i18n (fr.json + en.json)         | ✅ Done | `messages/`                            |
| Gmail SMTP credentials           | ✅ Done | `.env`                                 |

## What's Missing ❌

| Feature                                      | Blocked by Stripe?                 |
| -------------------------------------------- | ---------------------------------- |
| Booking Success page                         | ❌ No — can build now              |
| Booking Cancel/Error handling                | ❌ No — can build now              |
| Admin: search, filter, pagination            | ❌ No — can build now              |
| Admin: CSV export                            | ❌ No — can build now              |
| BookingWizard step animations                | ❌ No — can build now              |
| i18n: new translation keys                   | ❌ No — can build now              |
| Stripe keys in `.env`                        | 🔒 Yes — needs your Stripe account |
| Email templates (HTML instead of plain text) | ❌ No — can build now              |

---

## Implementation Plan — 4 Phases

### Phase A: Booking Success & Cancel Pages ⏱️ ~30 min

> **Blocked by Stripe:** No. Can start immediately.

**What I'll build:**

1. **`app/[locale]/booking/success/page.tsx`**
   - Accept `?session_id=...` (from Stripe) or `?bookingId=test` (from test checkout)
   - Display a clean confirmation card with: tour name, dates, passengers, total amount
   - Bilingual (FR/EN) using `next-intl`
   - Premium design: checkmark animation, confetti-style micro-animation, booking reference

2. **Cancel handling on booking page**
   - Detect `?canceled=true` on `app/[locale]/booking/page.tsx`
   - Show a dismissible alert banner above the `BookingWizard`
   - Message: "Your payment was canceled. You can try again below."

3. **New i18n keys** in `fr.json` and `en.json` for success/cancel messages

**Files created/modified:**

- `app/[locale]/booking/success/page.tsx` (new)
- `components/booking/BookingSuccess.tsx` (new)
- `app/[locale]/booking/page.tsx` (modify — add cancel banner)
- `components/booking/BookingWizard.tsx` (modify — add cancel banner)
- `messages/fr.json` (add keys)
- `messages/en.json` (add keys)

---

### Phase B: Admin Dashboard Enhancements ⏱️ ~45 min

> **Blocked by Stripe:** No. Can start immediately.

**What I'll build:**

1. **Bookings page — search & filter**
   - Client-side search bar (by name, email, booking ref)
   - Dropdown filters: payment status (PENDING/PAID/FAILED), booking status (CONFIRMED/CANCELLED/COMPLETED)
   - Filter by tour

2. **Contacts page — search & filter**
   - Search by name/email
   - Filter by status (NOUVEAU/CONTACTE/QUALIFIE/CONVERTI)

3. **Pagination** (both pages)
   - Show 20 items per page
   - Prev/Next buttons with page counter

4. **CSV Export button** (bookings page)
   - Client-side CSV generation
   - Includes: booking ref, client name, email, phone, tour, dates, passengers, traveler names, amount, payment status

**Files created/modified:**

- `components/admin/BookingsTable.tsx` (new — client component with search/filter/pagination)
- `components/admin/ContactsTable.tsx` (new — client component with search/filter)
- `components/admin/CsvExportButton.tsx` (new)
- `app/[locale]/admin/bookings/page.tsx` (modify — pass data to new component)
- `app/[locale]/admin/contacts/page.tsx` (modify — pass data to new component)

---

### Phase C: UI/UX Polish & Animations ⏱️ ~30 min

> **Blocked by Stripe:** No. Can start immediately.

**What I'll build:**

1. **BookingWizard step transitions**
   - Framer Motion `AnimatePresence` for step enter/exit
   - Slide + fade transitions between steps 1 → 2 → 3
   - Progress bar animation in the step indicator

2. **Button hover states**
   - Scale + shadow micro-animations on CTAs
   - Loading spinner on checkout buttons

3. **Responsive audit fixes**
   - Ensure the multi-traveler form works well on mobile (stack grid cols)
   - Fix any overflow or spacing issues

**Files modified:**

- `components/booking/BookingWizard.tsx` (add Framer Motion transitions)

---

### Phase D: Email Templates (HTML) ⏱️ ~20 min

> **Blocked by Stripe:** No. Can start immediately.

**What I'll build:**

1. **Replace plain-text emails with HTML templates**
   - Customer confirmation: branded header, tour details card, dates, total
   - Admin alert: structured booking summary table
   - Both bilingual-ready

2. **Contact form notification upgrade**
   - Replace plain text with a clean HTML email

**Files created/modified:**

- `lib/email-templates.ts` (new — HTML template functions)
- `app/api/webhook/stripe/route.ts` (modify — use new templates)
- `app/api/contact/route.ts` (modify — use new templates)

---

## What Stays Blocked (Stripe)

When you get your Stripe credentials, you'll need to add these 3 lines to `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Everything else (webhook code, checkout code, email on payment) is **already built and waiting**. Once you add the keys, the full payment flow will work end-to-end.

---

## Execution Order

| Order | Phase                          | Time    | Why this order                                  |
| ----- | ------------------------------ | ------- | ----------------------------------------------- |
| 1st   | **A** — Success & Cancel pages | ~30 min | Completes the user journey                      |
| 2nd   | **B** — Admin enhancements     | ~45 min | Makes the dashboard usable for daily operations |
| 3rd   | **C** — UI/UX animations       | ~30 min | Polish pass on the booking flow                 |
| 4th   | **D** — Email templates        | ~20 min | Upgrades plain-text emails to branded HTML      |

**Total estimated time: ~2 hours**

---

> [!IMPORTANT]
> This plan covers everything that can be done **right now** without Stripe keys. Once you provide the keys, zero additional code is needed — just paste them into `.env` and the payment flow is live.
