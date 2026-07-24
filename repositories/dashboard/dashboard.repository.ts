import prisma from "@/lib/prisma";

class DashboardRepository {
  async getStats(userId: string) {
    const [
      savedCount,
      applicationCount,
      opportunityCount,
      featuredCount,
    ] = await Promise.all([
      prisma.savedOpportunity.count({
        where: {
          userId,
        },
      }),

      prisma.application.count({
        where: {
          userId,
        },
      }),

      prisma.opportunity.count({
        where: {
          status: "OPEN",
        },
      }),

      prisma.opportunity.count({
        where: {
          status: "OPEN",
          featured: true,
        },
      }),
    ]);

    return {
      savedCount,
      applicationCount,
      opportunityCount,
      featuredCount,
    };
  }
}

export default new DashboardRepository();