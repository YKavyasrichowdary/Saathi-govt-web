import repository from "@/repositories/application/application.repository";
import prisma from "@/lib/prisma";

class ApplicationService {
  async apply(
    userId: string,
    opportunityId: string
  ) {
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

    const exists =
      await repository.alreadyApplied(
        userId,
        opportunityId
      );

    if (exists) {
      throw new Error(
        "You have already applied."
      );
    }

    return repository.apply(
      userId,
      opportunityId
    );
  }

  async getApplications(userId: string) {
    return repository.getApplications(
      userId
    );
  }
  async search(query: string) {
    return repository.search(query);
}
}

export default new ApplicationService();