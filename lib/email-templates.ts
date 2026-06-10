/**
 * Branded HTML email templates for Bahor-Voyage.
 * Used by: api/checkout (booking confirmation) and api/contact (contact form).
 */

const brand = {
  primary: '#8B5E3C',
  dark: '#1a1a1a',
  sand: '#FAF7F2',
  border: '#e8e0d6',
  logo: 'Bahor-Voyage',
  site: 'https://www.bahorvoyage.com',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
                <a href="${brand.site}" style="color:${brand.primary};text-decoration:none;">bahorvoyage.com</a>
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
    <h1 style="margin:0 0 24px;font-size:28px;color:${brand.dark};font-weight:normal;">Votre voyage est bien réservé !</h1>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#444;line-height:1.6;margin:0 0 28px;">
      Bonjour <strong>${escapeHtml(data.firstName)}</strong>,<br /><br />
      Merci pour votre réservation. Votre voyage est confirmé et notre équipe vous contactera dans les 48 heures pour finaliser les détails et convenir des modalités de paiement.
    </p>

    <!-- Payment notice -->
    <div style="background-color:#FFF8E1;border:1px solid #FFE082;border-radius:8px;padding:16px 20px;margin-bottom:28px;font-family:Arial,sans-serif;font-size:14px;color:#6D4C00;line-height:1.6;">
      💳 <strong>Paiement</strong> — Notre équipe vous contactera prochainement pour convenir des modalités de paiement.
    </div>

    <!-- Details table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:32px;">
      ${row('Circuit', escapeHtml(data.tourTitle))}
      ${row('Date de départ', escapeHtml(data.startDate))}
      ${row('Date de retour', escapeHtml(data.endDate))}
      ${row('Voyageurs', String(data.passengers))}
      ${row('Montant estimé', `${data.totalAmount} €`)}
      ${row('Référence', `<code style="font-size:12px;background:#f5f5f5;padding:2px 6px;border-radius:4px;">${escapeHtml(data.bookingRef)}</code>`)}
    </table>

    <!-- Next steps -->
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Prochaines étapes</p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      ${[
        'Notre équipe vous contactera sous 48h pour convenir du paiement.',
        'Vous recevrez des informations pratiques avant votre départ.',
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
    <h1 style="margin:0 0 24px;font-size:24px;color:${brand.dark};font-weight:normal;">Nouvelle réservation — ${escapeHtml(data.tourTitle)}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:28px;">
      ${row('Client', `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`)}
      ${row('Email', escapeHtml(data.email))}
      ${row('Téléphone', escapeHtml(data.phone))}
      ${row('Circuit', escapeHtml(data.tourTitle))}
      ${row('Départ', escapeHtml(data.startDate))}
      ${row('Retour', escapeHtml(data.endDate))}
      ${row('Voyageurs', String(data.passengers))}
      ${data.travelers ? row('Autres voyageurs', escapeHtml(data.travelers)) : ''}
      ${row('Montant estimé', `${data.totalAmount} €`)}
      ${row('Paiement', '<span style="color:#E65100;">À organiser</span>')}
      ${row('Référence', escapeHtml(data.bookingRef))}
    </table>

    <a href="${brand.site}/admin/bookings" style="display:inline-block;background-color:${brand.primary};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Voir dans le Dashboard</a>
  `;
  return wrapper(content);
}

// ─── Contact Form User Confirmation ─────────────────────────────────────────

export function contactConfirmationEmail(data: {
  name: string;
  message: string;
}): string {
  const content = `
    <p style="margin:0 0 8px;font-size:14px;color:${brand.primary};font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Confirmation</p>
    <h1 style="margin:0 0 24px;font-size:28px;color:${brand.dark};font-weight:normal;">Merci pour votre message !</h1>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#444;line-height:1.6;margin:0 0 28px;">
      Bonjour <strong>${escapeHtml(data.name)}</strong>,<br /><br />
      Nous avons bien reçu votre message et nous vous répondrons dans les <strong>24 à 48 heures</strong>.<br /><br />
      En attendant, n'hésitez pas à explorer nos circuits sur notre site.
    </p>

    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Votre message</p>
    <div style="background:${brand.sand};border:1px solid ${brand.border};border-radius:8px;padding:20px;font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.7;margin-bottom:32px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

    <a href="${brand.site}/circuits" style="display:inline-block;background-color:${brand.dark};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Découvrir nos circuits</a>
  `;
  return wrapper(content);
}

// ─── Contact Form Notification ───────────────────────────────────────────────

// ─── GDPR Data Deletion Request ─────────────────────────────────────────────

interface DataDeletionEmailData {
  name: string;
  email: string;
  message?: string;
}

export function dataDeletionEmail(data: DataDeletionEmailData): string {
  const content = `
    <p style="margin:0 0 8px;font-size:14px;color:${brand.primary};font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Demande RGPD</p>
    <h1 style="margin:0 0 24px;font-size:24px;color:${brand.dark};font-weight:normal;">Demande de suppression de données</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:28px;">
      ${row('Nom', escapeHtml(data.name))}
      ${row('Email', `<a href="mailto:${encodeURIComponent(data.email)}" style="color:${brand.primary};">${escapeHtml(data.email)}</a>`)}
    </table>

    ${
      data.message
        ? `
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Précisions</p>
    <div style="background:${brand.sand};border:1px solid ${brand.border};border-radius:8px;padding:20px;font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.7;margin-bottom:28px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    `
        : ''
    }

    <p style="font-family:Arial,sans-serif;font-size:13px;color:#888;line-height:1.6;">Cette demande doit être traitée dans un délai d'un mois conformément à l'article 12 du RGPD.</p>
    <a href="mailto:${encodeURIComponent(data.email)}" style="display:inline-block;background-color:${brand.dark};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Répondre à ${escapeHtml(data.name)}</a>
  `;
  return wrapper(content);
}

// ─── Contact Form ────────────────────────────────────────────────────────────

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
    <h1 style="margin:0 0 24px;font-size:24px;color:${brand.dark};font-weight:normal;">Message de ${escapeHtml(data.name)}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;margin-bottom:28px;">
      ${row('Nom', escapeHtml(data.name))}
      ${row('Email', `<a href="mailto:${encodeURIComponent(data.email)}" style="color:${brand.primary};">${escapeHtml(data.email)}</a>`)}
      ${data.phone ? row('Téléphone', escapeHtml(data.phone)) : ''}
      ${data.tourInterest ? row('Circuit souhaité', escapeHtml(data.tourInterest)) : ''}
    </table>

    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
    <div style="background:${brand.sand};border:1px solid ${brand.border};border-radius:8px;padding:20px;font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.7;margin-bottom:28px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

    <a href="mailto:${encodeURIComponent(data.email)}" style="display:inline-block;background-color:${brand.dark};color:white;padding:14px 28px;border-radius:50px;font-family:Arial,sans-serif;font-size:14px;text-decoration:none;">Répondre à ${escapeHtml(data.name)}</a>
  `;
  return wrapper(content);
}
