import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import {
  customerConfirmationEmail,
  adminBookingAlert,
} from '@/lib/email-templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
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
        },
      });

      // 2. Increment booked seats
      if (booking) {
        await prisma.tourDate.update({
          where: { id: booking.tourDateId },
          data: { bookedSeats: { increment: booking.passengers } },
        });
      }

      // 3. Send HTML emails
      if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const fmt = (d: Date) =>
          d.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

        const emailData = {
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.phone,
          tourTitle: booking.tourDate.tour.titleFr,
          startDate: fmt(new Date(booking.tourDate.startDate)),
          endDate: fmt(new Date(booking.tourDate.endDate)),
          passengers: booking.passengers,
          totalAmount: booking.totalAmount,
          bookingRef: booking.id.slice(-10).toUpperCase(),
          travelers:
            booking.travelers.length > 0
              ? booking.travelers
                  .map((t) => `${t.firstName} ${t.lastName}`)
                  .join(', ')
              : undefined,
        };

        // Email to customer
        await transporter.sendMail({
          from: `"Bahor-Voyage" <${process.env.SMTP_USER}>`,
          to: booking.email,
          subject: `Confirmation de votre réservation — ${emailData.tourTitle}`,
          html: customerConfirmationEmail(emailData),
        });

        // Email to agency
        await transporter.sendMail({
          from: `"Bahor-Voyage" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          subject: `🎉 NOUVELLE RÉSERVATION — ${emailData.tourTitle}`,
          html: adminBookingAlert(emailData),
        });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
