import prisma from '@/lib/prisma';
import StatusUpdater from '@/components/admin/StatusUpdater';

export default async function AdminContactsPage() {
  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif text-charcoal-700">
        Demandes de Contact (CRM)
      </h2>

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Nom</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Intérêt</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-sand-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-charcoal-500 whitespace-nowrap">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-medium text-charcoal-800">
                  {contact.name}
                </td>
                <td className="px-6 py-4 text-charcoal-500">
                  <div>{contact.email}</div>
                  <div className="text-xs">{contact.phone}</div>
                </td>
                <td className="px-6 py-4 text-charcoal-500">
                  {contact.tourInterest || '-'}
                </td>
                <td
                  className="px-6 py-4 text-charcoal-500 max-w-xs truncate"
                  title={contact.message}
                >
                  {contact.message}
                </td>
                <td className="px-6 py-4">
                  <StatusUpdater
                    id={contact.id}
                    currentStatus={contact.status}
                    type="contact"
                    options={['NOUVEAU', 'CONTACTE', 'QUALIFIE', 'CONVERTI']}
                  />
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-charcoal-400"
                >
                  Aucune demande de contact
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
