import prisma from "@/lib/prisma";
import activityService from "./activity.service";

class ProgressService {
  async getProgress(userId: string) {
    const [
      userXP,
      missionsCompleted,
      applications,
      savedOpportunities,
      resumeAnalyses,
      roadmaps,
      roadmapTasks,
      currentStreak,
      longestStreak,
    ] = await Promise.all([
      prisma.userXP.findUnique({
        where: {
          userId,
        },
      }),

      prisma.mission.count({
        where: {
          userId,
          status: "COMPLETED",
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

      prisma.roadmap.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          title: true,
          progress: true,
          status: true,
          targetDate: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),

      prisma.roadmapTask.findMany({
        where: {
          milestone: {
            roadmap: {
              userId,
            },
          },
        },
        select: {
          id: true,
          status: true,
          estimatedMinutes: true,
          completedAt: true,
        },
      }),

      activityService.getCurrentStreak(userId),

      activityService.getLongestStreak(userId),
    ]);

    const activityDays =
      await activityService.getActivityDays(
        userId,
        84
      );

    const completedRoadmapTasks =
      roadmapTasks.filter(
        (task: any) => task.status === "COMPLETED"
      );

    const estimatedMinutesCompleted =
      completedRoadmapTasks.reduce(
        (total: number, task: any) =>
          total + task.estimatedMinutes,
        0
      );

    return {
      xp: {
        totalXP: userXP?.totalXP ?? 0,
        level: userXP?.level ?? 1,
        currentStreak,
        longestStreak,
        missionsCompleted:
          userXP?.missionsCompleted ??
          missionsCompleted,
      },

      stats: {
        missionsCompleted,
        applications,
        savedOpportunities,
        resumeAnalyses,
        roadmaps: roadmaps.length,
        roadmapTasksCompleted:
          completedRoadmapTasks.length,
        estimatedMinutesCompleted,
      },

      activityDays,

      roadmaps,
    };
  }
}

export default new ProgressService();