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

  async getTodayMissions(userId: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return prisma.mission.findMany({
      where: {
        userId,
        OR: [
          {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          {
            completedAt: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async getTodayMission(userId: string) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return prisma.mission.findFirst({
    where: {
      userId,

      status: {
        in: [
          MissionStatus.PENDING,
          MissionStatus.IN_PROGRESS,
        ],
      },

      createdAt: {
        gte: start,
        lte: end,
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
async completeMission(
  id: string,
  userId: string
) {
  const mission =
    await prisma.mission.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        status: true,
      },
    });

  if (!mission) {
    throw new Error("Mission not found.");
  }

  if (mission.userId !== userId) {
    throw new Error("Unauthorized.");
  }

  if (mission.status === "COMPLETED") {
    return prisma.mission.findUnique({
      where: {
        id,
      },
    });
  }

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