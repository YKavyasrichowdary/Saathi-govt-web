import prisma from "@/lib/prisma";

class OpportunityRepository {
  async getDashboardOpportunities(
  userId: string,
  limit = 6
) {
  return prisma.opportunity.findMany({
    where: {
      status: "OPEN",
    },

    include: {
      bookmarks: {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    },

    orderBy: [
      {
        featured: "desc",
      },
      {
        deadline: "asc",
      },
      {
        createdAt: "desc",
      },
    ],

    take: limit,
  });
}

  async getLatest(limit = 12) {
    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async getBySlug(slug: string) {
    return prisma.opportunity.findUnique({
      where: {
        slug,
      },
    });
  }
  async getAll() {
  return prisma.opportunity.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        deadline: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}
}

export default new OpportunityRepository();