import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('booking_id');

  try {
    let booking = null;

    if (sessionId) {
      // Look up booking via Stripe session's client_reference_id
      // First get the session from Stripe to get our booking ID
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { error: 'Stripe not configured' },
          { status: 500 },
        );
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiVersion: '2023-10-16' as any,
      });

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const refId = session.client_reference_id;

      if (refId) {
        booking = await prisma.booking.findUnique({
          where: { id: refId },
          include: {
            tourDate: { include: { tour: true } },
          },
        });
      }
    } else if (bookingId) {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          tourDate: { include: { tour: true } },
        },
      });
    }

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error('API /bookings/confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
