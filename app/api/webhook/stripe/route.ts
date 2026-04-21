import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
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

    // The client_reference_id contains our Booking ID
    const bookingId = session.client_reference_id;

    if (bookingId) {
      // 1. Update Booking Status
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
        include: { tourDate: { include: { tour: true } } },
      });

      // 2. Decrement available seats (Increment bookedSeats)
      if (booking) {
        await prisma.tourDate.update({
          where: { id: booking.tourDateId },
          data: {
            bookedSeats: {
              increment: booking.passengers,
            },
          },
        });
      }

      // 3. Send Confirmation Email (to Client & Agency)
      if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        // Email to Client
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: booking.email,
          subject: `Confirmation de votre réservation - Bahor-Voyage`,
          text: `Bonjour ${booking.firstName},\n\nVotre paiement a bien été reçu et votre réservation pour le circuit "${booking.tourDate.tour.titleFr}" est confirmée.\n\nNombre de voyageurs : ${booking.passengers}\nDates : du ${new Date(booking.tourDate.startDate).toLocaleDateString('fr-FR')} au ${new Date(booking.tourDate.endDate).toLocaleDateString('fr-FR')}\n\nNous reviendrons vers vous très prochainement avec plus de détails.\n\nL'équipe Bahor-Voyage`,
        });

        // Email to Agency
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER,
          subject: `NOUVELLE RÉSERVATION PAYÉE - ${booking.tourDate.tour.titleFr}`,
          text: `Une nouvelle réservation vient d'être payée en ligne.\n\nClient : ${booking.firstName} ${booking.lastName} (${booking.email})\nTéléphone : ${booking.phone}\nCircuit : ${booking.tourDate.tour.titleFr}\nDates : ${new Date(booking.tourDate.startDate).toLocaleDateString('fr-FR')} -> ${new Date(booking.tourDate.endDate).toLocaleDateString('fr-FR')}\nVoyageurs : ${booking.passengers}\nMontant payé : ${booking.totalAmount} €\n\nConsultez le Dashboard pour plus de détails.`,
        });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
