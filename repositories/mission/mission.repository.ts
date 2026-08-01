import prisma from "@/lib/prisma";
import {
  MissionCategory,
  MissionPriority,
  MissionStatus,
} from "@prisma/client";

class MissionRepository {
  async create(data: {
    userId: string;
    title: string;
    description: string;
    category: MissionCategory;
    priority?: MissionPriority;
    estimatedMinutes: number;
    rewardResumeScore?: number;
    rewardOpportunityMatch?: number;
    rewardProfileScore?: number;
    rewardXP?: number;
  }) {
    return prisma.mission.create({
      data: {
        ...data,
        priority:
          data.priority ?? MissionPriority.MEDIUM,
      },
    });
  }

  async getTodayMission(userId: string) {
    return prisma.mission.findFirst({
      where: {
        userId,
        status: {
          in: [
            MissionStatus.PENDING,
            MissionStatus.IN_PROGRESS,
          ],
        },
      },
      orderBy: [
        {
          priority: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  async getAll(userId: string) {
    return prisma.mission.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateStatus(
    id: string,
    status: MissionStatus
  ) {
    return prisma.mission.update({
      where: {
        id,
      },
      data: {
        status,
        completedAt:
          status === MissionStatus.COMPLETED
            ? new Date()
            : null,
      },
    });
  }

  async delete(id: string) {
    return prisma.mission.delete({
      where: {
        id,
      },
    });
  }
  async completeMission(id: string) {
    return prisma.mission.update({
      where: {
        id,
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });
  }

  async getMission(id: string) {
    return prisma.mission.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new MissionRepository();