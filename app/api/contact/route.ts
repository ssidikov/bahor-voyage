import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { contactFormEmail } from '@/lib/email-templates';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, tourInterest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Des champs requis sont manquants.' },
        { status: 400 },
      );
    }

    // 1. Sauvegarder la demande en base de données
    const contact = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        tourInterest: tourInterest || null,
        message,
        status: 'NOUVEAU',
      },
    });

    // 2. Préparer l'envoi de l'email via Nodemailer
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
        subject: `Nouveau message de ${name} — Bahor-Voyage`,
        html: contactFormEmail({ name, email, phone, tourInterest, message }),
      });
    } else {
      console.warn('SMTP_USER ou SMTP_PASSWORD non configuré. Email ignoré.');
    }

    return NextResponse.json({ success: true, contact }, { status: 200 });
  } catch (error) {
    console.error('Erreur API Contact:', error);
    return NextResponse.json(
      { error: 'Erreur Serveur Interne' },
      { status: 500 },
    );
  }
}
