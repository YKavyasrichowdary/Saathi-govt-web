import opportunityRepository from "@/repositories/opportunity/opportunity.repository";
import type { NormalizedOpportunity } from "@/lib/opportunities/opportunity-normalizer";

class OpportunityIngestionService {
  async upsertOpportunity(
    data: NormalizedOpportunity
  ) {
    if (!data.officialId) {
      throw new Error("officialId is required.");
    }

    if (!data.title) {
      throw new Error(
        "Opportunity title is required."
      );
    }

    if (!data.organization) {
      throw new Error(
        "Organization is required."
      );
    }

    if (!data.registrationLink) {
      throw new Error(
        "Registration link is required."
      );
    }

    return opportunityRepository.upsertByOfficialId({
      ...data,
      officialId: data.officialId,
    });
  }

  async ingest(
    opportunities: NormalizedOpportunity[]
  ) {
    let createdCount = 0;
    let updatedCount = 0;
    let failedCount = 0;

    const results = [];

    for (const opportunity of opportunities) {
      try {
        const result =
          await this.upsertOpportunity(
            opportunity
          );

        if (result.created) {
          createdCount++;
        } else {
          updatedCount++;
        }

        results.push({
          success: true,
          officialId:
            opportunity.officialId,
          id: result.opportunity.id,
          created: result.created,
        });
      } catch (error) {
        failedCount++;

        results.push({
          success: false,
          officialId:
            opportunity.officialId,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error",
        });
      }
    }

    return {
      fetched: opportunities.length,
      created: createdCount,
      updated: updatedCount,
      failed: failedCount,
      results,
    };
  }
}

export default new OpportunityIngestionService();