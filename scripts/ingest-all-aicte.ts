import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function runIngestion() {
  const { syncAICTEInternships } = await import("../lib/opportunities/sync-aicte");
  const prisma = (await import("../lib/prisma")).default;

  console.log("=== INGESTING ALL 924 AICTE INTERNSHIPS ===");

  const syncResult = await syncAICTEInternships();

  console.log("\n--- Sync Summary ---");
  console.log(`Source:  ${syncResult.source}`);
  console.log(`Fetched: ${syncResult.fetched}`);
  console.log(`Created: ${syncResult.created}`);
  console.log(`Updated: ${syncResult.updated}`);
  console.log(`Failed:  ${syncResult.failed}`);

  if (syncResult.failed > 0) {
    console.log("\nErrors encountered during sync:");
    syncResult.results
      .filter((r) => !r.success)
      .forEach((r) => console.error(`- ${r.officialId}: ${r.error}`));
  }

  console.log("\n--- Prisma Database Verification ---");

  const totalMatching = await prisma.opportunity.count({
    where: {
      source: "GOVERNMENT",
      sourceName: "AICTE National Internship Portal",
      type: "INTERNSHIP",
      status: "OPEN",
    },
  });

  const uniqueOfficialIds = await prisma.opportunity.groupBy({
    by: ["officialId"],
    where: {
      sourceName: "AICTE National Internship Portal",
    },
  });

  console.log(`Total DB matching records (source=GOVERNMENT, sourceName="AICTE National Internship Portal", type=INTERNSHIP, status=OPEN): ${totalMatching}`);
  console.log(`Total Unique officialIds in DB: ${uniqueOfficialIds.length}`);

  await prisma.$disconnect();
}

runIngestion().catch(async (e) => {
  console.error("Ingestion failed:", e);
  process.exit(1);
});
