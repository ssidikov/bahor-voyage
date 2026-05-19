import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { dataDeletionEmail } from '@/lib/email-templates';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Les champs nom et email sont requis.' },
        { status: 400 },
      );
    }

    await prisma.contactRequest.create({
      data: {
        name,
        email,
        message: message || 'Demande de suppression de données personnelles.',
        tourInterest: 'RGPD — Suppression de données',
        status: 'NOUVEAU',
      },
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Bahor-Voyage" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `[RGPD] Demande de suppression de données — ${name}`,
        html: dataDeletionEmail({ name, email, message }),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur API Data Deletion:', error);
    return NextResponse.json(
      { error: 'Erreur Serveur Interne' },
      { status: 500 },
    );
  }
}
