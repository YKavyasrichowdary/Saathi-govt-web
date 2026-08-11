import { randomUUID } from "crypto";
import { supabaseStorage } from "./supabase-storage";
import fs from "fs/promises";
import path from "path";

class StorageService {
  async uploadDocument(file: File): Promise<string> {
    const extension = file.name.split(".").pop() || "pdf";
    const fileName = `${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      const { data, error } = await supabaseStorage.storage
        .from("documents")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (error) {
        console.warn("⚠️ Supabase storage upload warning, saving locally:", error.message);
        return await this.uploadLocal(fileName, buffer);
      }

      return data.path;
    } catch (err: any) {
      console.warn("⚠️ Supabase storage error, saving locally:", err?.message || err);
      return await this.uploadLocal(fileName, buffer);
    }
  }

  private async uploadLocal(fileName: string, buffer: Buffer): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${fileName}`;
  }

  async deleteDocument(pathStr: string) {
    if (pathStr.startsWith("/uploads/")) {
      try {
        const localPath = path.join(process.cwd(), "public", pathStr);
        await fs.unlink(localPath);
      } catch (err) {
        console.warn("Failed to delete local file:", err);
      }
      return;
    }

    try {
      const { error } = await supabaseStorage.storage
        .from("documents")
        .remove([pathStr]);

      if (error) {
        console.warn("Failed to delete Supabase document:", error.message);
      }
    } catch (err) {
      console.warn("Supabase delete error:", err);
    }
  }

  async getSignedUrl(pathStr: string): Promise<string> {
    if (
      pathStr.startsWith("/uploads/") ||
      pathStr.startsWith("http://") ||
      pathStr.startsWith("https://")
    ) {
      return pathStr;
    }

    try {
      const { data, error } = await supabaseStorage.storage
        .from("documents")
        .createSignedUrl(pathStr, 60 * 60);

      if (error || !data?.signedUrl) {
        return pathStr;
      }

      return data.signedUrl;
    } catch {
      return pathStr;
    }
  }

  async getFileBuffer(pathStr: string): Promise<Buffer> {
    if (pathStr.startsWith("/uploads/")) {
      const localPath = path.join(process.cwd(), "public", pathStr);
      return await fs.readFile(localPath);
    }

    if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
      const res = await fetch(pathStr);
      if (!res.ok) throw new Error("Failed to fetch document file.");
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    try {
      const { data, error } = await supabaseStorage.storage
        .from("documents")
        .download(pathStr);

      if (error || !data) {
        throw new Error(error?.message || "Failed to download file from Supabase");
      }

      const arrayBuffer = await data.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err: any) {
      console.warn("⚠️ Supabase download error, checking local fallback:", err?.message || err);
      const localPath = path.join(process.cwd(), "public", pathStr.startsWith("/") ? pathStr : `/uploads/${pathStr}`);
      return await fs.readFile(localPath);
    }
  }
}

export default new StorageService();