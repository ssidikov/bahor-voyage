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

export async function updatePaymentStatus(id: string, paymentStatus: string) {
  await checkAdmin();
  await prisma.booking.update({
    where: { id },
    data: { paymentStatus },
  });
  revalidatePath('/admin/bookings');
}
