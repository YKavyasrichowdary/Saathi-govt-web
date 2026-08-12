import prisma from "@/lib/prisma";
import activityService from "@/services/progress/activity.service";

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
    const [
      resumeAnalyses,
      completedMissions,
      savedOpportunities,
      applications,
      roadmaps,
    ] = await Promise.all([
      prisma.resumeAnalysis.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          atsScore: true,
          overallScore: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.mission.findMany({
        where: {
          userId,
          status: "COMPLETED",
          completedAt: {
            not: null,
          },
        },
        select: {
          id: true,
          title: true,
          completedAt: true,
        },
        orderBy: {
          completedAt: "desc",
        },
        take: 5,
      }),

      prisma.savedOpportunity.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          createdAt: true,
          opportunity: {
            select: {
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.application.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          appliedAt: true,
          status: true,
          opportunity: {
            select: {
              title: true,
            },
          },
        },
        orderBy: {
          appliedAt: "desc",
        },
        take: 5,
      }),

      prisma.roadmap.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    const activities = [
      ...resumeAnalyses.map((item: any) => ({
        id: `resume-${item.id}`,
        title: "Resume Analyzed",
        message:
          item.atsScore !== null &&
          item.atsScore !== undefined
            ? `Your resume received an ATS score of ${item.atsScore}%.`
            : "Your resume analysis was completed.",
        createdAt: item.createdAt,
      })),

      ...completedMissions.map((item: any) => ({
        id: `mission-${item.id}`,
        title: "Mission Completed",
        message: item.title,
        createdAt: item.completedAt!,
      })),

      ...savedOpportunities.map((item: any) => ({
        id: `saved-${item.id}`,
        title: "Opportunity Saved",
        message: item.opportunity.title,
        createdAt: item.createdAt,
      })),

      ...applications.map((item: any) => ({
        id: `application-${item.id}`,
        title: "Application Submitted",
        message: item.opportunity.title,
        createdAt: item.appliedAt,
      })),

      ...roadmaps.map((item: any) => ({
        id: `roadmap-${item.id}`,
        title: "Roadmap Created",
        message: item.title,
        createdAt: item.createdAt,
      })),
    ];

    return activities
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
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

  async getStreakHistory(userId: string) {
    const activities =
      await activityService.getActivityDays(
        userId,
        14
      );

    const activeDates = new Set(
      activities.map((activity: any) =>
        activity.date
          .toISOString()
          .slice(0, 10)
      )
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: number[] = [];

    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(
        today.getDate() - i
      );

      const key = date
        .toISOString()
        .slice(0, 10);

      days.push(
        activeDates.has(key) ? 1 : 0
      );
    }

    return days;
  }
}

export default new DashboardRepository();