import prisma from "@/lib/prisma";
import { OpportunitySource } from "@prisma/client";

class OpportunitySyncRepository {
  async create(data: {
    source: OpportunitySource;
    sourceName: string;
  }) {
    return prisma.opportunitySync.create({
      data: {
        source: data.source,
        sourceName: data.sourceName,
        status: "RUNNING",
      },
    });
  }

  async complete(
    id: string,
    data: {
      fetchedCount: number;
      createdCount: number;
      updatedCount: number;
      failedCount: number;
    }
  ) {
    return prisma.opportunitySync.update({
      where: {
        id,
      },
      data: {
        status: "SUCCESS",
        completedAt: new Date(),
        fetchedCount: data.fetchedCount,
        createdCount: data.createdCount,
        updatedCount: data.updatedCount,
        failedCount: data.failedCount,
      },
    });
  }

  async fail(
    id: string,
    error: string
  ) {
    return prisma.opportunitySync.update({
      where: {
        id,
      },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        error,
      },
    });
  }

  async getLatest(
    source: OpportunitySource
  ) {
    return prisma.opportunitySync.findFirst({
      where: {
        source,
      },
      orderBy: {
        startedAt: "desc",
      },
    });
  }
}

export default new OpportunitySyncRepository();