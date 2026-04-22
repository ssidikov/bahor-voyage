import prisma from '@/lib/prisma';
import ContactsTable from '@/components/admin/ContactsTable';

export default async function AdminContactsPage() {
  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif text-charcoal-700">
        Demandes de Contact (CRM)
      </h2>
      <ContactsTable contacts={contacts} />
    </div>
  );
}
