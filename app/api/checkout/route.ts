import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendBookingConfirmationEmails } from '@/lib/booking-email';

interface TravelerData {
  firstName: string;
  lastName: string;
  email?: string;
}

const MAX_PASSENGERS = 20;
const MAX_NAME_LENGTH = 100;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPositiveInt(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v > 0;
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

    // --- Input validation ---

    if (typeof tourDateId !== 'string' || !tourDateId.trim()) {
      return NextResponse.json(
        { error: 'tourDateId invalide' },
        { status: 400 },
      );
    }

    if (!isPositiveInt(passengers) || passengers > MAX_PASSENGERS) {
      return NextResponse.json(
        { error: 'Nombre de passagers invalide' },
        { status: 400 },
      );
    }

    if (
      typeof firstName !== 'string' ||
      !firstName.trim() ||
      firstName.length > MAX_NAME_LENGTH
    ) {
      return NextResponse.json({ error: 'Prénom invalide' }, { status: 400 });
    }

    if (
      typeof lastName !== 'string' ||
      !lastName.trim() ||
      lastName.length > MAX_NAME_LENGTH
    ) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 });
    }

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { error: 'Téléphone invalide' },
        { status: 400 },
      );
    }

    // Validate travelers array
    const validatedTravelers: TravelerData[] = [];
    if (Array.isArray(travelers)) {
      for (const t of travelers) {
        if (
          typeof t?.firstName !== 'string' ||
          !t.firstName.trim() ||
          typeof t?.lastName !== 'string' ||
          !t.lastName.trim()
        ) {
          return NextResponse.json(
            { error: 'Données voyageur invalides' },
            { status: 400 },
          );
        }
        if (
          t.email &&
          (typeof t.email !== 'string' || !EMAIL_RE.test(t.email))
        ) {
          return NextResponse.json(
            { error: 'Email voyageur invalide' },
            { status: 400 },
          );
        }
        validatedTravelers.push({
          firstName: t.firstName.trim(),
          lastName: t.lastName.trim(),
          email: t.email || undefined,
        });
      }
    }

    // --- Fetch tour date and validate options ---

    const tourDate = await prisma.tourDate.findUnique({
      where: { id: tourDateId },
      include: { tour: { include: { options: true } } },
    });

    if (!tourDate) {
      return NextResponse.json({ error: 'Date non trouvée' }, { status: 404 });
    }

    // Compute options amount
    let optionsAmount = 0;
    const bookingOptionsData = [];

    if (options && typeof options === 'object') {
      for (const [optId, qty] of Object.entries(options)) {
        const quantity = Number(qty);
        if (!Number.isInteger(quantity) || quantity < 0) {
          return NextResponse.json(
            { error: 'Quantité option invalide' },
            { status: 400 },
          );
        }
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

    // Compute total from DB prices
    const totalAmount = tourDate.price * passengers + optionsAmount;

    // --- Atomic seat reservation ---
    // Single conditional update to prevent TOCTOU race
    const seatResult = await prisma.tourDate.updateMany({
      where: {
        id: tourDateId,
        bookedSeats: { lte: tourDate.maxSeats - passengers },
      },
      data: {
        bookedSeats: { increment: passengers },
      },
    });

    if (seatResult.count === 0) {
      return NextResponse.json(
        { error: 'Pas assez de places disponibles' },
        { status: 400 },
      );
    }

    // --- Create Booking ---
    const booking = await prisma.booking.create({
      data: {
        tourDateId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        passengers,
        message: typeof message === 'string' ? message : undefined,
        totalAmount,
        paymentStatus: 'PENDING',
        status: 'CONFIRMED',
        options: {
          create: bookingOptionsData,
        },
        travelers: {
          create: validatedTravelers,
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

    // --- Send confirmation emails ---
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
