import { jsPDF } from 'jspdf';

type BookingTravelerForEmail = {
  firstName: string;
  lastName: string;
};

type BookingForEmail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passengers: number;
  totalAmount: number;
  paymentStatus: string;
  createdAt: Date;
  tourDate: {
    startDate: Date;
    endDate: Date;
    tour: {
      titleFr: string;
    };
  };
  travelers: BookingTravelerForEmail[];
  options: Array<{ tourOption: { nameFr: string } }>;
};

export async function generateBookingPdf(
  booking: BookingForEmail,
): Promise<Buffer> {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Header
  doc.setFillColor(244, 241, 234); // Sand color
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(0, 102, 102); // Primary color
  doc.setFont('serif', 'bold');
  doc.setFontSize(24);
  doc.text('BAHOR VOYAGE', margin, 25);

  doc.setFontSize(10);
  doc.setFont('sans', 'normal');
  doc.text('CONFIRMATION DE RÉSERVATION', pageWidth - margin, 25, {
    align: 'right',
  });

  // Booking Reference
  const shortId = booking.id.slice(-8).toUpperCase();
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(12);
  doc.text(`Référence: ${shortId}`, margin, 50);
  doc.text(
    `Date: ${new Date(booking.createdAt).toLocaleDateString('fr-FR')}`,
    pageWidth - margin,
    50,
    { align: 'right' },
  );

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 55, pageWidth - margin, 55);

  // Tour Details
  doc.setTextColor(0, 102, 102);
  doc.setFontSize(14);
  doc.setFont('serif', 'bold');
  doc.text('Détails du Circuit', margin, 70);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('sans', 'normal');
  doc.text(`Circuit: ${booking.tourDate.tour.titleFr}`, margin, 80);
  doc.text(
    `Date de départ: ${new Date(booking.tourDate.startDate).toLocaleDateString('fr-FR')}`,
    margin,
    87,
  );
  doc.text(`Nombre de passagers: ${booking.passengers}`, margin, 94);

  // Options
  if (booking.options.length > 0) {
    const optionsText = booking.options
      .map((o) => o.tourOption.nameFr)
      .join(', ');
    doc.text(`Options: ${optionsText}`, margin, 101);
  }

  // Customer Details
  doc.setTextColor(0, 102, 102);
  doc.setFontSize(14);
  doc.setFont('serif', 'bold');
  doc.text('Informations Client', margin, 115);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('sans', 'normal');
  doc.text(`Nom: ${booking.firstName} ${booking.lastName}`, margin, 125);
  doc.text(`Email: ${booking.email}`, margin, 132);
  doc.text(`Téléphone: ${booking.phone}`, margin, 139);

  // Travelers
  if (booking.travelers.length > 0) {
    doc.setFont('sans', 'bold');
    doc.text('Autres voyageurs:', margin, 149);
    doc.setFont('sans', 'normal');
    booking.travelers.forEach((t, i) => {
      doc.text(`- ${t.firstName} ${t.lastName}`, margin + 5, 156 + i * 7);
    });
  }

  // Payment Summary
  const paymentY = 160 + booking.travelers.length * 7 + 15;
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, paymentY - 10, pageWidth - margin * 2, 30, 'F');

  doc.setTextColor(0, 102, 102);
  doc.setFontSize(14);
  doc.setFont('serif', 'bold');
  doc.text('Récapitulatif de paiement', margin + 5, paymentY);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text(`${booking.totalAmount} €`, pageWidth - margin - 5, paymentY + 10, {
    align: 'right',
  });

  doc.setFontSize(10);
  const status =
    booking.paymentStatus === 'PAID'
      ? 'Paiement validé'
      : 'En attente de paiement';
  doc.text(`Statut: ${status}`, margin + 5, paymentY + 10);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'Bahor-Voyage • 12 Place Ambroise Courtois, 69008 Lyon • contact@bahor-voyage.com',
    pageWidth / 2,
    280,
    { align: 'center' },
  );
  doc.text(
    'Ce document fait office de confirmation officielle.',
    pageWidth / 2,
    285,
    { align: 'center' },
  );

  // Return as Buffer
  const pdfOutput = doc.output('arraybuffer');
  return Buffer.from(pdfOutput);
}
