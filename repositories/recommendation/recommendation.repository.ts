import prisma from "@/lib/prisma";

class RecommendationRepository {
  async getProfile(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async getOpenOpportunities() {
    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",
      },

      include: {
        bookmarks: true,
      },

      orderBy: [
        {
          featured: "desc",
        },
        {
          deadline: "asc",
        },
      ],
    });
  }
}

export default new RecommendationRepository();