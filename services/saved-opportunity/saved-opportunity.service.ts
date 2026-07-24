import repository from "@/repositories/saved-opportunity/saved-opportunity.repository";
import prisma from "@/lib/prisma";

class SavedOpportunityService {
  async save(userId: string, opportunityId: string) {
    if (!opportunityId) {
      throw new Error("Opportunity ID is required.");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User account not found. Please sign in again.");
    }

    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      select: { id: true },
    });

    if (!opportunity) {
      throw new Error("Opportunity not found.");
    }

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