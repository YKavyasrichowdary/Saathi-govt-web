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

  async search(params: OpportunitySearchParams) {
    const {
      q,
      type,
      mode,
      source,
      status = "OPEN",
      educationLevel,
      limit = 50,
      userId,
    } = params;

    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status as OpportunityStatus;
    }

    if (type) {
      where.type = type as OpportunityType;
    }

    if (mode) {
      where.mode = mode as OpportunityMode;
    }

    if (source) {
      where.source = source as OpportunitySource;
    }

    if (educationLevel) {
      where.educationLevel = educationLevel as EducationLevel;
    }

    if (q && q.trim()) {
      const query = q.trim();
      const queryUpper = query.toUpperCase();

      const validTypes = Object.values(OpportunityType);

      let matchedType: OpportunityType | undefined;
      if (validTypes.includes(queryUpper as OpportunityType)) {
        matchedType = queryUpper as OpportunityType;
      } else if (queryUpper.endsWith("S")) {
        const singularUpper = queryUpper.slice(0, -1) as OpportunityType;
        if (validTypes.includes(singularUpper)) {
          matchedType = singularUpper;
        }
      }

      const searchConditions: Record<string, unknown>[] = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { organization: { contains: query, mode: "insensitive" } },
        { eligibility: { contains: query, mode: "insensitive" } },
        { benefits: { contains: query, mode: "insensitive" } },
        { state: { contains: query, mode: "insensitive" } },
        { city: { contains: query, mode: "insensitive" } },
      ];

      if (matchedType) {
        searchConditions.push({ type: matchedType });
      }

      where.OR = searchConditions;
    }

    return prisma.opportunity.findMany({
      where,
      include: userId
        ? {
            bookmarks: {
              where: {
                userId,
              },
              select: {
                id: true,
              },
            },
          }
        : undefined,
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
}

export default new OpportunityRepository();