import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

interface TravelerData {
  firstName: string;
  lastName: string;
  email?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      tourDateId,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      options,
      message,
      travelers,
    } = body;

    if (
      !tourDateId ||
      !passengers ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 },
      );
    }

    // 1. Validate Tour Date and Options
    const tourDate = await prisma.tourDate.findUnique({
      where: { id: tourDateId },
      include: { tour: { include: { options: true } } },
    });

    if (!tourDate) {
      return NextResponse.json({ error: 'Date non trouvée' }, { status: 404 });
    }

    const availableSeats = tourDate.maxSeats - tourDate.bookedSeats;
    if (passengers > availableSeats) {
      return NextResponse.json(
        { error: 'Pas assez de places disponibles' },
        { status: 400 },
      );
    }

    // Prepare line items for Stripe
    const line_items = [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: tourDate.tour.titleFr,
            description: `Départ le ${tourDate.startDate.toLocaleDateString('fr-FR')} - ${passengers} voyageur(s)`,
          },
          unit_amount: Math.round(tourDate.price * 100), // in cents
        },
        quantity: passengers,
      },
    ];

    // Compute options amount and create BookingOption array
    let optionsAmount = 0;
    const bookingOptionsData = [];

    if (options && typeof options === 'object') {
      for (const [optId, qty] of Object.entries(options)) {
        const quantity = Number(qty);
        if (quantity > 0) {
          const tourOpt = tourDate.tour.options.find((o) => o.id === optId);
          if (tourOpt) {
            optionsAmount += tourOpt.price * quantity;
            bookingOptionsData.push({
              tourOptionId: tourOpt.id,
              quantity,
              priceAtBooking: tourOpt.price,
            });

            line_items.push({
              price_data: {
                currency: 'eur',
                product_data: {
                  name: tourOpt.nameFr,
                  description: `Option`,
                },
                unit_amount: Math.round(tourOpt.price * 100),
              },
              quantity,
            });
          }
        }
      }
    }

    // 2. Compute Total Price
    const totalAmount = tourDate.price * passengers + optionsAmount;

    // 3. Create Booking in DB as PENDING
    const booking = await prisma.booking.create({
      data: {
        tourDateId,
        firstName,
        lastName,
        email,
        phone,
        passengers,
        message,
        totalAmount,
        paymentStatus: 'PENDING',
        status: 'PENDING',
        options: {
          create: bookingOptionsData,
        },
        travelers: {
          create: Array.isArray(travelers)
            ? travelers.map((t: TravelerData) => ({
                firstName: t.firstName,
                lastName: t.lastName,
                email: t.email,
              }))
            : [],
        },
      },
    });

    // 4. Create Stripe Checkout Session
    // Mettre l'URL absolue pour Stripe
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    // Only works if Stripe key is present
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe is not configured in environment' },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: '2023-10-16' as any, // Using an older version specifically if the installed Stripe package requires it or typing works
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking?canceled=true`,
      client_reference_id: booking.id,
      customer_email: email,
    });

    // 5. Update booking with Stripe Session ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { paymentIntentId: session.id },
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error('API /checkout error:', error);
    return NextResponse.json(
      { error: 'Erreur Serveur Interne' },
      { status: 500 },
    );
  }
}
