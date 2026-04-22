require('dotenv/config');

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || 'Bahor Voyage Admin';

if (!connectionString) {
  console.error('DATABASE_URL is required.');
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error(
    'Set ADMIN_EMAIL and ADMIN_PASSWORD before running npm run admin:create.',
  );
  process.exit(1);
}

if (adminPassword.length < 12) {
  console.error('ADMIN_PASSWORD must be at least 12 characters long.');
  process.exit(1);
}

const normalizedEmail = adminEmail.trim().toLowerCase();

async function main() {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.adminUser.upsert({
      where: { email: normalizedEmail },
      update: {
        name: adminName,
        passwordHash,
        role: 'ADMIN',
      },
      create: {
        email: normalizedEmail,
        name: adminName,
        passwordHash,
        role: 'ADMIN',
      },
    });

    console.log(`Admin account is ready for ${admin.email}.`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Failed to create admin account:', error);
  process.exit(1);
});
