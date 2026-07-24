import prisma from "@/lib/prisma";
import {
  OpportunityType,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  EducationLevel,
} from "@prisma/client";

export interface OpportunitySearchParams {
  q?: string;
  type?: string;
  mode?: string;
  source?: string;
  status?: string;
  educationLevel?: string;
  limit?: number;
  userId?: string;
}

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

  async search(query: string) {
  return prisma.opportunity.findMany({
    where: {
      status: OpportunityStatus.OPEN,
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
        {
          location: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          course: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          specialization: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: [
      { featured: "desc" },
      { deadline: "asc" },
      { createdAt: "desc" },
    ],
  });
}
  
}

export default new OpportunityRepository();