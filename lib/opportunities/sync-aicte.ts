import {
  OpportunitySource,
} from "@prisma/client";

import {
  fetchAICTEInternships,
} from "./sources/aicte-internships";

import opportunityIngestionService from "@/services/opportunity/opportunity-ingestion.service";

import opportunitySyncRepository from "@/repositories/opportunity/opportunity-sync.repository";

export async function syncAICTEInternships() {
  const sync =
    await opportunitySyncRepository.create({
      source: OpportunitySource.GOVERNMENT,
      sourceName:
        "AICTE National Internship Portal",
    });

  try {
    console.log(
      "Fetching live AICTE internships..."
    );

    const opportunities =
      await fetchAICTEInternships();

    console.log(
      `Found ${opportunities.length} AICTE internships.`
    );

    const result =
      await opportunityIngestionService.ingest(
        opportunities
      );

    await opportunitySyncRepository.complete(
      sync.id,
      {
        fetchedCount: result.fetched,
        createdCount: result.created,
        updatedCount: result.updated,
        failedCount: result.failed,
      }
    );

    return {
      source:
        "AICTE National Internship Portal",

      fetched: result.fetched,

      created: result.created,

      updated: result.updated,

      failed: result.failed,

      results: result.results,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AICTE sync failed.";

    await opportunitySyncRepository.fail(
      sync.id,
      message
    );

    throw error;
  }
}