import "dotenv/config";
import prisma from "../lib/prisma";
import { scholarships } from "./data/scholarships";
import { internships } from "./data/internships";

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.opportunity.deleteMany();

  const opportunities = [
  ...scholarships,
  ...internships,
];

await prisma.opportunity.createMany({
  data: opportunities,
});

  console.log(
    `✅ Seeded ${scholarships.length} scholarships`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });