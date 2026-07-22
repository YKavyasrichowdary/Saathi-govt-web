import prisma from "@/lib/prisma";

import { Prisma } from "@prisma/client";

class OpportunityRepository {
  async create(data: Prisma.OpportunityCreateInput) {
    return prisma.opportunity.create({
      data,
    });
  }

  async findAll() {
    return prisma.opportunity.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.opportunity.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.OpportunityUpdateInput
  ) {
    return prisma.opportunity.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.opportunity.delete({
      where: {
        id,
      },
    });
  }
  async getStats() {
  const [
    total,
    open,
    draft,
    expired,
  ] = await Promise.all([
    prisma.opportunity.count(),

    prisma.opportunity.count({
      where: {
        status: "OPEN",
      },
    }),

    prisma.opportunity.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.opportunity.count({
      where: {
        status: "EXPIRED",
      },
    }),
  ]);

  return {
    total,
    open,
    draft,
    expired,
  };
}
}

export default new OpportunityRepository();