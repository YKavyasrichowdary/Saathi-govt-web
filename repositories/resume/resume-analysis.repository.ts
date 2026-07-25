import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

class ResumeAnalysisRepository {
  async create(data: Prisma.ResumeAnalysisCreateInput) {
    return prisma.resumeAnalysis.create({
      data,
    });
  }

  async findById(id: string) {
  return prisma.resumeAnalysis.findUnique({
    where: {
      id,
    },
    include: {
      document: {
        select: {
          id: true,
          title: true,
          fileName: true,
        },
      },
    },
  });
}

  async findLatestByDocument(documentId: string) {
    return prisma.resumeAnalysis.findFirst({
      where: {
        documentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.resumeAnalysis.findMany({
      where: {
        userId,
      },
      include: {
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return prisma.resumeAnalysis.delete({
      where: {
        id,
      },
    });
  }
}

export default new ResumeAnalysisRepository();