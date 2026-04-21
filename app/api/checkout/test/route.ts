import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface TravelerData {
  firstName: string;
  lastName: string;
  email?: string;
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not allowed in production' },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();
    const {
      tourDateId,
      options,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      message,
      travelers,
    } = body;

    // 1. Fetch tour date
    const tourDate = await prisma.tourDate.findUnique({
      where: { id: tourDateId },
      include: { tour: { include: { options: true } } },
    });

    if (!tourDate) {
      return NextResponse.json({ error: 'Date non trouvée' }, { status: 404 });
    }

    // 2. Calculate amount
    let totalAmount = tourDate.price * passengers;
    const selectedOptionsData = [];

    if (options && Object.keys(options).length > 0) {
      for (const [optionId, quantity] of Object.entries(options)) {
        const tourOpt = tourDate.tour.options.find((o) => o.id === optionId);
        if (tourOpt) {
          totalAmount += tourOpt.price * (quantity as number);
          selectedOptionsData.push({
            tourOptionId: tourOpt.id,
            quantity: quantity as number,
            priceAtBooking: tourOpt.price,
          });
        }
      }
    }

    // 3. Create booking directly
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
        paymentStatus: 'PAID', // Set to PAID for testing
        status: 'CONFIRMED',
        paymentIntentId: 'test_payment_' + Date.now(),
        options: {
          create: selectedOptionsData,
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

    // 4. Update seats
    await prisma.tourDate.update({
      where: { id: tourDateId },
      data: {
        bookedSeats: {
          increment: passengers,
        },
      },
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (err: unknown) {
    console.error('Test booking error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
