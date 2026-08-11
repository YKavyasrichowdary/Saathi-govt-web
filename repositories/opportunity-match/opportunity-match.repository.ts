import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
class OpportunityMatchRepository {

  async getByUserAndOpportunity(
    userId: string,
    opportunityId: string
  ) {

    return prisma.opportunityMatch.findUnique({

      where: {

        userId_opportunityId: {

          userId,

          opportunityId,

        },

      },

    });

  }

  async create(data: Prisma.OpportunityMatchCreateInput) {
    return prisma.opportunityMatch.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.OpportunityMatchUpdateInput
  ) {
    return prisma.opportunityMatch.update({
      where: {
        id,
      },
      data,
    });
  }

}

export default new OpportunityMatchRepository();