import prisma from "@/lib/prisma";

class ApplicationRepository {
  async apply(
    userId: string,
    opportunityId: string
  ) {
    return prisma.application.create({
      data: {
        userId,
        opportunityId,
      },
    });
  }

  async alreadyApplied(
    userId: string,
    opportunityId: string
  ) {
    return prisma.application.findUnique({
      where: {
        userId_opportunityId: {
          userId,
          opportunityId,
        },
      },
    });
  }

  async getApplications(userId: string) {
    return prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        opportunity: true,
      },

      orderBy: {
        appliedAt: "desc",
      },
    });
  }
  async search(query: string) {
  return prisma.opportunity.findMany({
    where: {
      status: "OPEN",
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          organization: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
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

export default new ApplicationRepository();