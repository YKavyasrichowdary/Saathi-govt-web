"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Trash2,
  Download,
} from "lucide-react";

import { toast } from "sonner";

interface Props {
  document: {
    id: string;
    title: string;
    fileName: string;
    fileSize: number;
    verified: boolean;
  };
}

export default function DocumentCard({
  document,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function deleteDocument() {

    if (loading) return;

    setLoading(true);

    try {

      const res = await fetch(
        "/api/documents",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: document.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      toast.success(
        "Document deleted."
      );

      router.refresh();

    } catch (error: any) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="surface-card rounded-2xl p-6">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            {document.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {document.fileName}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            {(document.fileSize / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            document.verified
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {document.verified
            ? "Verified"
            : "Pending"}
        </span>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          className="btn-secondary flex items-center gap-2"
        >
          <Download className="h-4 w-4" />

          View

        </button>

        <button
          onClick={deleteDocument}
          disabled={loading}
          className="btn-destructive flex items-center gap-2"
        >

          <Trash2 className="h-4 w-4" />

          Delete

        </button>

      </div>

    </div>
  );
}