import prisma from "@/lib/prisma";
import { DocumentType } from "@prisma/client";

class DocumentRepository {

  async create(data: {
    userId: string;
    title: string;
    type: DocumentType;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }) {
    if (!(prisma as any).document) return null;
    return (prisma as any).document.create({
      data,
    });
  }

  async getByUser(userId: string) {
    if (!(prisma as any).document) return [];
    return (prisma as any).document.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    if (!(prisma as any).document) return null;
    return (prisma as any).document.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    if (!(prisma as any).document) return null;
    return (prisma as any).document.delete({
      where: {
        id,
      },
    });
  }

}

export default new DocumentRepository();