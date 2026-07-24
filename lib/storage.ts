import { randomUUID } from "crypto";
import { supabaseStorage } from "./supabase-storage";

class StorageService {
  async uploadDocument(file: File) {
    const extension =
      file.name.split(".").pop();

    const fileName =
      `${randomUUID()}.${extension}`;

    const { data, error } =
      await supabaseStorage.storage
        .from("documents")
        .upload(fileName, file, {
          upsert: false,
        });

    if (error) {
      throw new Error(error.message);
    }

    return data.path;
  }

  async deleteDocument(path: string) {
    const { error } =
      await supabaseStorage.storage
        .from("documents")
        .remove([path]);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getSignedUrl(path: string) {
    const { data, error } =
      await supabaseStorage.storage
        .from("documents")
        .createSignedUrl(path, 60 * 60);

    if (error) {
      throw new Error(error.message);
    }

    return data.signedUrl;
  }
}

export default new StorageService();