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
  featured?: boolean;
  sort?: string;
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

  async getByIdOrSlug(identifier: string) {
    return prisma.opportunity.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier },
        ],
      },
    });
  }

  async getAll(sort?: string) {
    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };

    if (sort === "deadline") {
      orderBy = { deadline: "asc" };
    } else if (sort === "featured") {
      orderBy = { featured: "desc" };
    }

    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",
      },
      orderBy,
    });
  }

  async search(params: OpportunitySearchParams) {
    const {
      q,
      type,
      mode,
      source,
      educationLevel,
      featured,
      sort,
    } = params;

    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };

    if (sort === "deadline") {
      orderBy = { deadline: "asc" };
    } else if (sort === "featured") {
      orderBy = { featured: "desc" };
    }

    return prisma.opportunity.findMany({
      where: {
        status: "OPEN",

        ...(q && {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              organization: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }),

        ...(type && {
          type: type as OpportunityType,
        }),

        ...(mode && {
          mode: mode as OpportunityMode,
        }),

        ...(source && {
          source: source as OpportunitySource,
        }),

        ...(educationLevel && {
          educationLevel:
            educationLevel as EducationLevel,
        }),

        ...(featured && {
          featured: true,
        }),
      },

      orderBy,

      include: {
        bookmarks: true,
      },
    });
  }
}

export default new OpportunityRepository();