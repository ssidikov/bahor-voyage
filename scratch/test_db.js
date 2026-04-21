const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  try {
    const opts = await prisma.tourOption.findMany();
    console.log("DB connection successful! Found options:", opts.length);
  } catch(e) {
    console.error("DB error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
test();
