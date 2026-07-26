import prisma from "@/lib/prisma";
import {
  Prisma,
  RoadmapStatus,
  TaskStatus,
} from "@prisma/client";

class RoadmapRepository {

  async createRoadmap(
    data: Prisma.RoadmapCreateInput
  ) {
    return prisma.roadmap.create({
      data,
    });
  }

  async getActiveRoadmap(userId: string) {
    return prisma.roadmap.findFirst({
      where: {
        userId,
        status: RoadmapStatus.ACTIVE,
      },
      include: {
        opportunity: true,
        milestones: {
          include: {
            tasks: {
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async getRoadmap(id: string) {
    return prisma.roadmap.findUnique({
      where: {
        id,
      },
      include: {
        opportunity: true,
        milestones: {
          orderBy: {
            order: "asc",
          },
          include: {
            tasks: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });
  }

  async updateTaskStatus(
    taskId: string,
    status: TaskStatus
  ) {
    return prisma.roadmapTask.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
  }

  async completeRoadmap(id: string) {
    return prisma.roadmap.update({
      where: {
        id,
      },
      data: {
        status: RoadmapStatus.COMPLETED,
      },
    });
  }

}

export default new RoadmapRepository();