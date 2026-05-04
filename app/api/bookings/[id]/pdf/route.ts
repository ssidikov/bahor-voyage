import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { generateBookingPdf } from '@/lib/pdf-generator';
import type { BookingForEmail } from '@/lib/pdf-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        tourDate: {
          include: { tour: true },
        },
        travelers: true,
        options: {
          include: { tourOption: true },
        },
      },
    });

    if (!booking) {
      return new NextResponse('Booking not found', { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = await generateBookingPdf(
      booking as unknown as BookingForEmail,
    );

    const filename = `confirmation-${booking.id.slice(-8).toUpperCase()}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
