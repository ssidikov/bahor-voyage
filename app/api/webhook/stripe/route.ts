import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { sendBookingConfirmationEmails } from '@/lib/booking-email';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured in environment' },
      { status: 500 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook secret is missing' },
      { status: 500 },
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: '2023-10-16' as any,
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.client_reference_id;

    if (bookingId) {
      // 1. Update Booking Status
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
        include: {
          tourDate: { include: { tour: true } },
          travelers: true,
          options: { include: { tourOption: true } },
        },
      });

      // 2. Increment booked seats
      if (booking) {
        await prisma.tourDate.update({
          where: { id: booking.tourDateId },
          data: { bookedSeats: { increment: booking.passengers } },
        });
      }

      // 3. Send booking emails, but do not fail the webhook if SMTP has an issue.
      try {
        await sendBookingConfirmationEmails(booking);
      } catch (error) {
        console.error('Failed to send booking emails from Stripe webhook:', {
          bookingId: booking.id,
          error,
        });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
