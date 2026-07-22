import prisma from "@/lib/prisma";

class SavedOpportunityRepository {
  async save(userId: string, opportunityId: string) {
    return prisma.savedOpportunity.create({
      data: {
        userId,
        opportunityId,
      },
    });
  }

  async unsave(userId: string, opportunityId: string) {
    return prisma.savedOpportunity.delete({
      where: {
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }

  async isSaved(userId: string, opportunityId: string) {
    return prisma.savedOpportunity.findUnique({
      where: {
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }

  async getSavedByUser(userId: string) {
    return prisma.savedOpportunity.findMany({
      where: {
        userId,
      },

      include: {
        opportunity: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new SavedOpportunityRepository();