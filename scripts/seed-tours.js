
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const tours = [
  {
    slug: 'samarcande-boukhara',
    titleFr: 'Circuit Samarcande & Boukhara',
    titleEn: 'Samarkand & Bukhara Tour',
    durationDays: 7,
  },
  {
    slug: 'grand-circuit-18j',
    titleFr: 'Grand Circuit Ouzbékistan',
    titleEn: 'Grand Uzbekistan Tour',
    durationDays: 18,
  },
  {
    slug: 'immersion-totale-14j',
    titleFr: 'Immersion Totale',
    titleEn: 'Total Immersion',
    durationDays: 14,
  },
  {
    slug: 'voyage-solidaire-11j',
    titleFr: 'Voyage Solidaire',
    titleEn: 'Solidarity Journey',
    durationDays: 11,
  }
];

async function main() {
  console.log('Start seeding...');
  for (const tour of tours) {
    const created = await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: tour,
      create: tour,
    });
    console.log(`Upserted tour: ${created.slug}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
