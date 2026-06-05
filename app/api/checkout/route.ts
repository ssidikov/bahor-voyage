import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendBookingConfirmationEmails } from '@/lib/booking-email';

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

    // 2. Compute options amount and create BookingOption array
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
          }
        }
      }
    }

    // 3. Compute Total Price
    const totalAmount = tourDate.price * passengers + optionsAmount;

    // 4. Create Booking in DB
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
        status: 'CONFIRMED',
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
      include: {
        tourDate: {
          include: {
            tour: true,
          },
        },
        travelers: true,
        options: { include: { tourOption: true } },
      },
    });

    // 5. Increment booked seats
    await prisma.tourDate.update({
      where: { id: tourDateId },
      data: {
        bookedSeats: {
          increment: passengers,
        },
      },
    });

    // 6. Send confirmation emails
    let emailSent = false;
    try {
      emailSent = await sendBookingConfirmationEmails(booking);
    } catch (error) {
      console.error('Booking email failed:', {
        bookingId: booking.id,
        error,
      });
    }

    return NextResponse.json(
      { success: true, bookingId: booking.id, emailSent },
      { status: 200 },
    );
  } catch (error) {
    console.error('API /checkout error:', error);
    return NextResponse.json(
      { error: 'Erreur Serveur Interne' },
      { status: 500 },
    );
  }
}
