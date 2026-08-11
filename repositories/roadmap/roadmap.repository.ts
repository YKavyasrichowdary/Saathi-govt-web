import prisma from "@/lib/prisma";
import {
  Prisma,
  RoadmapStatus,
  TaskStatus,
} from "@prisma/client";

class RoadmapRepository {

  async completeTask(taskId: string) {

  return prisma.roadmapTask.update({

    where: {
      id: taskId,
    },

    data: {

      status: "COMPLETED",

      completedAt: new Date(),

    },

  });

}

async getTask(taskId: string) {

  return prisma.roadmapTask.findUnique({

    where: {
      id: taskId,
    },

    include: {

      milestone: {

        include: {

          roadmap: true,

          tasks: true,

        },

      },

    },

  });

}

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
async updateMilestoneStatus(
  milestoneId: string
) {

  const milestone =
    await prisma.roadmapMilestone.findUnique({

      where: {
        id: milestoneId,
      },

      include: {
        tasks: true,
      },

    });

  if (!milestone) {
    return null;
  }

  const completed =
    milestone.tasks.filter(
      (task: { status: string }) =>
        task.status === "COMPLETED"
    ).length;

  let status:
    "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED";

  if (completed === 0) {

    status = "PENDING";

  } else if (
    completed ===
    milestone.tasks.length
  ) {

    status = "COMPLETED";

  } else {

    status = "IN_PROGRESS";

  }

  return prisma.roadmapMilestone.update({

    where: {
      id: milestoneId,
    },

    data: {
      status,
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

 async updateRoadmapProgress(
  roadmapId: string
) {

  const roadmap =
    await prisma.roadmap.findUnique({

      where: {
        id: roadmapId,
      },

      include: {

        milestones: {

          include: {

            tasks: true,

          },

        },

      },

    });

  if (!roadmap) {
    return null;
  }

  const tasks =
    roadmap.milestones.flatMap(
      (milestone: { tasks: any[] }) => milestone.tasks
    );

  if (tasks.length === 0) {
    return roadmap;
  }

  const completedTasks =
    tasks.filter(
      (task: { status: string }) =>
        task.status === "COMPLETED"
    ).length;

  const progress =
    Math.round(
      (completedTasks / tasks.length) * 100
    );

  return prisma.roadmap.update({

    where: {
      id: roadmapId,
    },

    data: {

      progress,

    } as any,

  });

}

  async getUserRoadmaps(userId: string) {
    return prisma.roadmap.findMany({
      where: {
        userId,
      },
      include: {
        opportunity: true,
        milestones: {
          include: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getRoadmapByOpportunity(userId: string, opportunityId: string) {
    return prisma.roadmap.findFirst({
      where: {
        userId,
        opportunityId,
      },
      include: {
        opportunity: true,
        milestones: {
          include: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new RoadmapRepository();