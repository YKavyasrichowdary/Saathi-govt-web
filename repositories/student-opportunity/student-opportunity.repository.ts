import prisma from "@/lib/prisma";

class StudentOpportunityRepository {
  async getRecommended(userId: string) {
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) return [];

    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",

        OR: [
          {
            educationLevel:
              profile.educationLevel ?? undefined,
          },

          {
            educationLevel: null,
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

      take: 10,
    });
  }

  async getByType(type?: string) {
    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",
        ...(type ? { type: type as any } : {}),
      },
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }
}

export default new StudentOpportunityRepository();