require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is required.');
  process.exit(1);
}

async function main() {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('Connecting to database...');

    // Get current counts
    const bookingCount = await prisma.booking.count();
    const contactCount = await prisma.contactRequest.count();
    const tourDateCount = await prisma.tourDate.count();

    console.log(`Found ${bookingCount} bookings and ${contactCount} contact requests in the database.`);

    if (bookingCount === 0 && contactCount === 0) {
      console.log('No test data to clean up. Database is already clean.');
      return;
    }

    console.log('Cleaning up reservations (Booking)...');
    // Deleting bookings will cascade and delete BookingOption and Traveler records automatically due to onDelete: Cascade
    const deletedBookings = await prisma.booking.deleteMany();
    console.log(`Deleted ${deletedBookings.count} Booking records (and associated BookingOptions/Travelers).`);

    console.log('Resetting bookedSeats to 0 on all TourDates...');
    const updatedTourDates = await prisma.tourDate.updateMany({
      data: {
        bookedSeats: 0,
      },
    });
    console.log(`Reset bookedSeats for ${updatedTourDates.count} TourDate records.`);

    console.log('Cleaning up contact requests (ContactRequest)...');
    const deletedContacts = await prisma.contactRequest.deleteMany();
    console.log(`Deleted ${deletedContacts.count} ContactRequest records.`);

    console.log('Database cleanup completed successfully.');
  } catch (error) {
    console.error('An error occurred during database cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Execution failed:', error);
  process.exit(1);
});
