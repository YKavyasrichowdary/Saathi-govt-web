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

  async upsertByOfficialId(data: {
    officialId: string;
    title: string;
    organization: string;
    slug?: string;
    type: OpportunityType;
    source: OpportunitySource;
    sourceName?: string;
    sourceUrl?: string;
    description: string;
    registrationLink: string;
    mode: OpportunityMode;
    location?: string;
    eligibility?: string;
    benefits?: string;
    applicationProcess?: string;
    deadline?: Date;
    startDate?: Date;
    endDate?: Date;
    educationLevel?: EducationLevel;
    course?: string;
    specialization?: string;
    state?: string;
    city?: string;
    minCGPA?: number;
    skills?: string[];
    interests?: string[];
    careerTags?: string[];
  }) {
    const slug =
      data.slug ||
      `${data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}-${data.officialId
        .slice(0, 32)
        .replace(/[^a-z0-9]+/g, "-")}`;

    const existing =
      await prisma.opportunity.findUnique({
        where: {
          officialId: data.officialId,
        },
        select: {
          id: true,
        },
      });

    const opportunity =
      await prisma.opportunity.upsert({
        where: {
          officialId: data.officialId,
        },

        update: {
          title: data.title,
          organization: data.organization,
          slug,
          type: data.type,
          source: data.source,
          sourceName: data.sourceName,
          sourceUrl: data.sourceUrl,
          description: data.description,
          registrationLink: data.registrationLink,
          mode: data.mode,
          location: data.location,
          eligibility: data.eligibility,
          benefits: data.benefits,
          applicationProcess:
            data.applicationProcess,
          deadline: data.deadline,
          startDate: data.startDate,
          endDate: data.endDate,
          educationLevel:
            data.educationLevel,
          course: data.course,
          specialization:
            data.specialization,
          state: data.state,
          city: data.city,
          minCGPA: data.minCGPA,
          skills: data.skills ?? [],
          interests: data.interests ?? [],
          careerTags: data.careerTags ?? [],
          lastSyncedAt: new Date(),
        },

        create: {
          officialId: data.officialId,
          title: data.title,
          organization: data.organization,
          slug,
          type: data.type,
          source: data.source,
          sourceName: data.sourceName,
          sourceUrl: data.sourceUrl,
          description: data.description,
          registrationLink:
            data.registrationLink,
          mode: data.mode,
          location: data.location,
          eligibility: data.eligibility,
          benefits: data.benefits,
          applicationProcess:
            data.applicationProcess,
          deadline: data.deadline,
          startDate: data.startDate,
          endDate: data.endDate,
          educationLevel:
            data.educationLevel,
          course: data.course,
          specialization:
            data.specialization,
          state: data.state,
          city: data.city,
          minCGPA: data.minCGPA,
          skills: data.skills ?? [],
          interests: data.interests ?? [],
          careerTags: data.careerTags ?? [],
          lastSyncedAt: new Date(),
          status: "OPEN",
        },
      });

    return {
      opportunity,
      created: !existing,
    };
  }
}

export default new OpportunityRepository();