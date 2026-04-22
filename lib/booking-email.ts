import nodemailer from 'nodemailer';
import {
  adminBookingAlert,
  customerConfirmationEmail,
} from '@/lib/email-templates';

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
  tourDate: {
    startDate: Date;
    endDate: Date;
    tour: {
      titleFr: string;
    };
  };
  travelers: BookingTravelerForEmail[];
};

const formatBookingDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export async function sendBookingConfirmationEmails(
  booking: BookingForEmail,
): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn(
      'SMTP_USER or SMTP_PASSWORD is not configured. Booking emails skipped.',
    );
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailData = {
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    phone: booking.phone,
    tourTitle: booking.tourDate.tour.titleFr,
    startDate: formatBookingDate(new Date(booking.tourDate.startDate)),
    endDate: formatBookingDate(new Date(booking.tourDate.endDate)),
    passengers: booking.passengers,
    totalAmount: booking.totalAmount,
    bookingRef: booking.id.slice(-10).toUpperCase(),
    travelers:
      booking.travelers.length > 0
        ? booking.travelers
            .map((traveler) => `${traveler.firstName} ${traveler.lastName}`)
            .join(', ')
        : undefined,
  };

  await transporter.sendMail({
    from: `"Bahor-Voyage" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: `Confirmation de votre réservation — ${emailData.tourTitle}`,
    html: customerConfirmationEmail(emailData),
  });

  await transporter.sendMail({
    from: `"Bahor-Voyage" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `🎉 NOUVELLE RÉSERVATION — ${emailData.tourTitle}`,
    html: adminBookingAlert(emailData),
  });

  return true;
}
