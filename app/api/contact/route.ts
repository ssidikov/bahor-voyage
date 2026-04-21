import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Envoyer à l'agence Bahor-Voyage
      replyTo: email,
      subject: `Nouveau Message Bahor-Voyage de ${name}`,
      text: `Vous avez reçu un nouveau message via le site web.

Détails du contact :
Nom : ${name}
Email : ${email}
Téléphone : ${phone || 'Non renseigné'}
Circuit souhaité : ${tourInterest || 'Non renseigné'}

Message :
${message}
      `,
    };

    // N'envoyer l'email que si SMTP_USER est configuré, pour ne pas crasher en dev local
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      await transporter.sendMail(mailOptions);
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
