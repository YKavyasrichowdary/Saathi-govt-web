import prisma from "@/lib/prisma";

class DashboardRepository {
  async getQuickStats(userId: string) {
    const [
      documents,
      applications,
      saved,
      analyses,
    ] = await Promise.all([
      prisma.document.count({
        where: {
          userId,
        },
      }),

      prisma.application.count({
        where: {
          userId,
        },
      }),

      prisma.savedOpportunity.count({
        where: {
          userId,
        },
      }),

      prisma.resumeAnalysis.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      documents,
      applications,
      saved,
      analyses,
    };
  }

  async getLatestResume(userId: string) {
    return prisma.resumeAnalysis.findFirst({
      where: {
        userId,
      },

      include: {
        document: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getRecentActivity(userId: string) {
    return prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    });
  }

  async getSavedOpportunities(userId: string) {
    return prisma.savedOpportunity.findMany({
      where: {
        userId,
      },

      include: {
        opportunity: true,
      },

      take: 4,
    });
  }

  async getUser(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserXP(userId: string) {
    return prisma.userXP.findUnique({
      where: {
        userId,
      },
    });
  }

  async getUserMissions(userId: string) {
    return prisma.mission.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getUserProfile(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async getStreakHistory(_userId: string): Promise<number[]> {
    return [2, 2, 3, 1, 4, 2, 0, 1, 2, 3, 2, 4, 3, 2];
  }
}

export default new DashboardRepository();