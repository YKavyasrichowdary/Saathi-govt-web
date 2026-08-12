import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const { syncAICTEInternships } = await import("../lib/opportunities/sync-aicte");
  const prisma = (await import("../lib/prisma")).default;

  console.log("=== Testing AICTE Ingestion Sync ===");

  const syncResult = await syncAICTEInternships();

  console.log("\n--- Sync Result ---");
  console.log(`Source:     ${syncResult.source}`);
  console.log(`Fetched:    ${syncResult.fetched}`);
  console.log(`Created:    ${syncResult.created}`);
  console.log(`Updated:    ${syncResult.updated}`);
  console.log(`Failed:     ${syncResult.failed}`);

  if (syncResult.failed > 0) {
    console.log("\nErrors encountered:");
    syncResult.results
      .filter((r) => !r.success)
      .forEach((r) => console.error(`- ${r.officialId}: ${r.error}`));
  }

  console.log("\n--- Verifying Prisma Database Storage ---");

  const opportunitiesInDb = await prisma.opportunity.findMany({
    where: {
      sourceName: "AICTE National Internship Portal",
    },
    select: {
      id: true,
      officialId: true,
      title: true,
      organization: true,
      type: true,
      source: true,
      sourceName: true,
      status: true,
      deadline: true,
      mode: true,
      location: true,
    },
  });

  console.log(`Found ${opportunitiesInDb.length} records in Prisma DB:\n`);

  opportunitiesInDb.forEach((opp: any, i: number) => {
    console.log(`[Record #${i + 1}]`);
    console.log(`Title:       ${opp.title}`);
    console.log(`Org:         ${opp.organization}`);
    console.log(`OfficialId:  ${opp.officialId}`);
    console.log(`Type:        ${opp.type}`);
    console.log(`Source:      ${opp.source}`);
    console.log(`SourceName:  ${opp.sourceName}`);
    console.log(`Status:      ${opp.status}`);
    console.log(`Deadline:    ${opp.deadline ? opp.deadline.toISOString().split("T")[0] : "None"}`);
    console.log(`Mode:        ${opp.mode}`);
    console.log(`Location:    ${opp.location ?? "N/A"}\n`);
  });

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
