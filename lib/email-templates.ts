/**
 * Branded HTML email templates for Bahor-Voyage.
 * Used by: webhook/stripe (booking confirmation) and api/contact (contact form).
 */

const brand = {
  primary: '#8B5E3C',
  dark: '#1a1a1a',
  sand: '#FAF7F2',
  border: '#e8e0d6',
  logo: 'Bahor-Voyage',
  site: 'https://www.bahor-voyage.com',
};

const wrapper = (content: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bahor-Voyage</title>
</head>
<body style="margin:0;padding:0;background-color:${brand.sand};font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${brand.sand};padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:${brand.dark};padding:28px 40px;border-radius:12px 12px 0 0;text-align:center;">
              <span style="font-family:'Georgia',serif;font-size:24px;color:#ffffff;letter-spacing:1px;">${brand.logo}</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-left:1px solid ${brand.border};border-right:1px solid ${brand.border};">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:${brand.sand};padding:24px 40px;border-radius:0 0 12px 12px;border:1px solid ${brand.border};border-top:none;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;">
                Bahor-Voyage / AFOR &bull; 12 Place Ambroise Courtois, 69008 Lyon &bull;
                <a href="${brand.site}" style="color:${brand.primary};text-decoration:none;">bahor-voyage.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:13px;color:#666;border-bottom:1px solid ${brand.border};width:40%;">${label}</td>
    <td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:13px;color:#1a1a1a;font-weight:600;border-bottom:1px solid ${brand.border};">${value}</td>
  </tr>
`;

// ─── Customer Booking Confirmation ──────────────────────────────────────────

interface BookingEmailData {
  firstName: string;
  lastName: string;
  tourTitle: string;
  startDate: string;
  endDate: string;
  passengers: number;
  totalAmount: number;
  bookingRef: string;
}

export function customerConfirmationEmail(data: BookingEmailData): string {
  const content = `
    <p style="margin:0 0 8px;font-size:14px;color:${brand.primary};font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Confirmation</p>
    <h1 style="margin:0 0 24px;font-size:28px;color:${brand.dark};font-weight:normal;">Votre voyage est réservé !</h1>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#444;line-height:1.6;margin:0 0 28px;">
      Bonjour <strong>${data.firstName}</strong>,<br /><br />
      Merci pour votre réservation. Votre paiement a bien été reçu et votre voyage est confirmé. Notre équipe vous contactera dans les 48 heures pour finaliser les détails.
    </p>

    <!-- Details table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:32px;">
      ${row('Circuit', data.tourTitle)}
      ${row('Date de départ', data.startDate)}
      ${row('Date de retour', data.endDate)}
      ${row('Voyageurs', String(data.passengers))}
      ${row('Montant total', `${data.totalAmount} €`)}
      ${row('Référence', `<code style="font-size:12px;background:#f5f5f5;padding:2px 6px;border-radius:4px;">${data.bookingRef}</code>`)}
    </table>

    <!-- Next steps -->
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Prochaines étapes</p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      ${[
        'Vous recevrez bientôt des informations pratiques avant votre départ.',
        'Notre équipe vous contactera sous 48h pour finaliser la logistique.',
        "N'hésitez pas à nous contacter pour toute question.",
      ]
        .map(
          (step, i) => `
        <tr>
          <td style="vertical-align:top;padding:0 12px 12px 0;">
            <span style="display:inline-block;width:24px;height:24px;background-color:${brand.primary};color:white;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-family:Arial,sans-serif;">${i + 1}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:12px;font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.5;">${step}</td>
        </tr>`,
        )
        .join('')}
    </table>

    <a href="${brand.site}/contact" style="display:inline-block;background-color:${brand.dark};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Nous contacter</a>
  `;
  return wrapper(content);
}

// ─── Admin Booking Alert ─────────────────────────────────────────────────────

export function adminBookingAlert(
  data: BookingEmailData & { email: string; phone: string; travelers?: string },
): string {
  const content = `
    <p style="margin:0 0 8px;font-size:14px;color:${brand.primary};font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Nouvelle réservation</p>
    <h1 style="margin:0 0 24px;font-size:24px;color:${brand.dark};font-weight:normal;">Réservation payée — ${data.tourTitle}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:28px;">
      ${row('Client', `${data.firstName} ${data.lastName}`)}
      ${row('Email', data.email)}
      ${row('Téléphone', data.phone)}
      ${row('Circuit', data.tourTitle)}
      ${row('Départ', data.startDate)}
      ${row('Retour', data.endDate)}
      ${row('Voyageurs', String(data.passengers))}
      ${data.travelers ? row('Autres voyageurs', data.travelers) : ''}
      ${row('Montant payé', `${data.totalAmount} €`)}
      ${row('Référence', data.bookingRef)}
    </table>

    <a href="${brand.site}/admin/bookings" style="display:inline-block;background-color:${brand.primary};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Voir dans le Dashboard</a>
  `;
  return wrapper(content);
}

// ─── Contact Form Notification ───────────────────────────────────────────────

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  tourInterest?: string;
  message: string;
}

export function contactFormEmail(data: ContactEmailData): string {
  const content = `
    <p style="margin:0 0 8px;font-size:14px;color:${brand.primary};font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Nouveau message</p>
    <h1 style="margin:0 0 24px;font-size:24px;color:${brand.dark};font-weight:normal;">Message de ${data.name}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:28px;">
      ${row('Nom', data.name)}
      ${row('Email', `<a href="mailto:${data.email}" style="color:${brand.primary};">${data.email}</a>`)}
      ${data.phone ? row('Téléphone', data.phone) : ''}
      ${data.tourInterest ? row('Circuit souhaité', data.tourInterest) : ''}
    </table>

    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
    <div style="background:${brand.sand};border:1px solid ${brand.border};border-radius:8px;padding:20px;font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.7;margin-bottom:28px;white-space:pre-wrap;">${data.message}</div>

    <a href="mailto:${data.email}" style="display:inline-block;background-color:${brand.dark};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Répondre à ${data.name}</a>
  `;
  return wrapper(content);
}
