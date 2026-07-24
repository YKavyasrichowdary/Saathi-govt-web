import repository from "@/repositories/document/document.repository";
import { DocumentType } from "@prisma/client";

class DocumentService {

  async upload(data: {
    userId: string;
    title: string;
    type: DocumentType;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }) {

    if (!data.fileUrl) {
      throw new Error("File URL is required.");
    }

    if (data.fileSize > 5 * 1024 * 1024) {
      throw new Error(
        "Maximum upload size is 5MB."
      );
    }

    return repository.create(data);

  }

  async getDocuments(userId: string) {
    return repository.getByUser(userId);
  }

  async delete(id: string) {
    return repository.delete(id);
  }

}

export default new DocumentService();