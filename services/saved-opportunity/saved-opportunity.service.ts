import repository from "@/repositories/saved-opportunity/saved-opportunity.repository";

class SavedOpportunityService {
  async save(userId: string, opportunityId: string) {
    const existing = await repository.isSaved(
      userId,
      opportunityId
    );

    if (existing) {
      throw new Error(
        "Opportunity already saved."
      );
    }

    return repository.save(
      userId,
      opportunityId
    );
  }

  async unsave(
    userId: string,
    opportunityId: string
  ) {
    return repository.unsave(
      userId,
      opportunityId
    );
  }

  async getSavedByUser(userId: string) {
    return repository.getSavedByUser(
      userId
    );
  }

  async isSaved(
    userId: string,
    opportunityId: string
  ) {
    return repository.isSaved(
      userId,
      opportunityId
    );
  }
}

export default new SavedOpportunityService();