'use server';

import prisma from '@/lib/prisma';

export async function getTourBookingData(slug: string) {
  const tour = await prisma.tour.findUnique({
    where: { slug },
    include: {
      dates: {
        where: { isActive: true, startDate: { gte: new Date() } },
        orderBy: { startDate: 'asc' },
      },
      options: {
        where: { isActive: true },
      },
    },
  });

  return tour;
}
