import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const dates = await prisma.tourDate.findMany({
      where: {
        isActive: true,
        startDate: {
          gt: new Date(),
        },
      },
      include: {
        tour: {
          select: {
            slug: true,
            titleFr: true,
            titleEn: true,
            options: {
              where: { isActive: true },
            },
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json({ dates }, { status: 200 });
  } catch (error) {
    console.error('API /tours/dates error:', error);
    return NextResponse.json(
      { error: 'Erreur Serveur Interne' },
      { status: 500 },
    );
  }
}
