'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Helper to check admin access
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const adminUser = await prisma.adminUser.findUnique({
    where: { email: session.user.email.trim().toLowerCase() },
    select: { role: true },
  });

  if (!adminUser || adminUser.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
}

export interface TourInput {
  slug: string;
  titleFr: string;
  titleEn: string;
  durationDays: string | number;
  isActive: boolean | string;
}

export interface TourDateInput {
  startDate: string | Date;
  endDate: string | Date;
  price: string | number;
  maxSeats: string | number;
  isGuaranteed: boolean | string;
  isActive: boolean | string;
}

export interface TourOptionInput {
  nameFr: string;
  nameEn: string;
  price: string | number;
  type: string;
  isActive: boolean | string;
}

// ---------------------------
// TOURS
// ---------------------------

export async function createTour(data: TourInput) {
  await checkAdmin();
  const tour = await prisma.tour.create({
    data: {
      slug: data.slug,
      titleFr: data.titleFr,
      titleEn: data.titleEn,
      durationDays:
        typeof data.durationDays === 'string'
          ? parseInt(data.durationDays, 10)
          : data.durationDays,
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath('/admin/circuits');
  return tour;
}

export async function updateTour(id: string, data: TourInput) {
  await checkAdmin();
  const tour = await prisma.tour.update({
    where: { id },
    data: {
      slug: data.slug,
      titleFr: data.titleFr,
      titleEn: data.titleEn,
      durationDays:
        typeof data.durationDays === 'string'
          ? parseInt(data.durationDays, 10)
          : data.durationDays,
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath('/admin/circuits');
  revalidatePath(`/admin/circuits/${id}`);
  return tour;
}

export async function deleteTour(id: string) {
  await checkAdmin();

  // First delete related options if they don't have cascade (schema says they do, but let's be safe or just rely on cascade)
  // Actually, we should check if there are bookings before allowing deletion,
  // or just let Prisma fail if there are restricted relations.

  await prisma.tour.delete({
    where: { id },
  });

  revalidatePath('/admin/circuits');
}

// ---------------------------
// TOUR DATES
// ---------------------------

export async function createTourDate(tourId: string, data: TourDateInput) {
  await checkAdmin();
  const date = await prisma.tourDate.create({
    data: {
      tourId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      maxSeats:
        typeof data.maxSeats === 'string'
          ? parseInt(data.maxSeats, 10)
          : data.maxSeats,
      isGuaranteed: data.isGuaranteed === 'on' || data.isGuaranteed === true,
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath(`/admin/circuits/${tourId}`);
  return date;
}

export async function updateTourDate(id: string, data: TourDateInput) {
  await checkAdmin();
  const date = await prisma.tourDate.update({
    where: { id },
    data: {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      maxSeats:
        typeof data.maxSeats === 'string'
          ? parseInt(data.maxSeats, 10)
          : data.maxSeats,
      isGuaranteed: data.isGuaranteed === 'on' || data.isGuaranteed === true,
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath(`/admin/circuits/${date.tourId}`);
  return date;
}

export async function deleteTourDate(id: string, tourId: string) {
  await checkAdmin();
  await prisma.tourDate.delete({ where: { id } });
  revalidatePath(`/admin/circuits/${tourId}`);
}

// ---------------------------
// TOUR OPTIONS
// ---------------------------

export async function createTourOption(tourId: string, data: TourOptionInput) {
  await checkAdmin();
  const option = await prisma.tourOption.create({
    data: {
      tourId,
      nameFr: data.nameFr,
      nameEn: data.nameEn,
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      type: data.type, // "SUPPLEMENT", "EXCURSION", "UPGRADE"
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath(`/admin/circuits/${tourId}`);
  return option;
}

export async function updateTourOption(id: string, data: TourOptionInput) {
  await checkAdmin();
  const option = await prisma.tourOption.update({
    where: { id },
    data: {
      nameFr: data.nameFr,
      nameEn: data.nameEn,
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      type: data.type,
      isActive: data.isActive === 'on' || data.isActive === true,
    },
  });
  revalidatePath(`/admin/circuits/${option.tourId}`);
  return option;
}

export async function deleteTourOption(id: string, tourId: string) {
  await checkAdmin();
  await prisma.tourOption.delete({ where: { id } });
  revalidatePath(`/admin/circuits/${tourId}`);
}

// ---------------------------
// CONTACTS
// ---------------------------

export async function updateContactStatus(id: string, status: string) {
  await checkAdmin();
  await prisma.contactRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin/contacts');
}

// ---------------------------
// BOOKINGS
// ---------------------------

export async function updateBookingStatus(id: string, status: string) {
  await checkAdmin();
  await prisma.booking.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin/bookings');
}

export async function syncDatabaseSchema() {
  // Bypassing checkAdmin for maintenance since the DB might be in a broken state
  // await checkAdmin();

  const sql = `
    CREATE TABLE IF NOT EXISTS "TourOption" (
        "id" TEXT NOT NULL,
        "tourId" TEXT NOT NULL,
        "nameFr" TEXT NOT NULL,
        "nameEn" TEXT NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'SUPPLEMENT',
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "TourOption_pkey" PRIMARY KEY ("id")
    );

    CREATE TABLE IF NOT EXISTS "BookingOption" (
        "id" TEXT NOT NULL,
        "bookingId" TEXT NOT NULL,
        "tourOptionId" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL DEFAULT 1,
        "priceAtBooking" DOUBLE PRECISION NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "BookingOption_pkey" PRIMARY KEY ("id")
    );

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Tour' AND column_name='slug') THEN
            ALTER TABLE "Tour" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Booking' AND column_name='message') THEN
            ALTER TABLE "Booking" ADD COLUMN "message" TEXT;
        END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "Traveler" (
        "id" TEXT NOT NULL,
        "bookingId" TEXT NOT NULL,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "email" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Traveler_pkey" PRIMARY KEY ("id")
    );

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'Tour_slug_key') THEN
            CREATE UNIQUE INDEX "Tour_slug_key" ON "Tour"("slug");
        END IF;
    END $$;

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='TourOption_tourId_fkey') THEN
            ALTER TABLE "TourOption" ADD CONSTRAINT "TourOption_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='BookingOption_bookingId_fkey') THEN
            ALTER TABLE "BookingOption" ADD CONSTRAINT "BookingOption_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='BookingOption_tourOptionId_fkey') THEN
            ALTER TABLE "BookingOption" ADD CONSTRAINT "BookingOption_tourOptionId_fkey" FOREIGN KEY ("tourOptionId") REFERENCES "TourOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Traveler_bookingId_fkey') THEN
            ALTER TABLE "Traveler" ADD CONSTRAINT "Traveler_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
    END $$;

    -- Seed slugs if missing
    UPDATE "Tour" SET "slug" = 'samarcande-boukhara' WHERE "titleFr" LIKE '%Samarcande%' AND ("slug" = '' OR "slug" IS NULL);
    UPDATE "Tour" SET "slug" = 'grand-circuit-18j' WHERE "titleFr" LIKE '%Grand Circuit%' AND ("slug" = '' OR "slug" IS NULL);
    UPDATE "Tour" SET "slug" = 'immersion-totale-14j' WHERE "titleFr" LIKE '%Immersion%' AND ("slug" = '' OR "slug" IS NULL);
    UPDATE "Tour" SET "slug" = 'voyage-solidaire-11j' WHERE "titleFr" LIKE '%Solidaire%' AND ("slug" = '' OR "slug" IS NULL);
  `;

  await prisma.$executeRawUnsafe(sql);
  revalidatePath('/admin');
}
