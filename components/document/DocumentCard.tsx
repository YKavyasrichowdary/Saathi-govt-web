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
    mimeType?: string;
    type?: string;
    verified: boolean;
    createdAt?: string | Date;
  };
}

export default function DocumentCard({
  document,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function viewDocument() {

    try {

      const res = await fetch(
        `/api/documents/view?id=${document.id}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      window.open(
        data.url,
        "_blank"
      );

    } catch (error: any) {

      toast.error(error.message);

    }

  }

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
      setShowConfirm(false);

    }

  }

  const status = document.verified ? "Verified" : "Pending";

  const badgeStyles: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Verified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Expired: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <div className="surface-card rounded-2xl p-6 transition-all hover:shadow-md border border-border">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <h3 className="text-lg font-semibold text-foreground">
            {document.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground break-all">
            {document.fileName}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            {(document.mimeType || "FILE")
              .replace("application/", "")
              .replace("image/", "")
              .toUpperCase()}
            {" • "}
            {(document.fileSize / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium shrink-0 ${
            badgeStyles[status] || badgeStyles.Pending
          }`}
        >
          {status === "Verified" ? "🟢 Verified" : "🟡 Pending"}
        </span>

      </div>

      {showConfirm ? (
        <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Delete {document.title}?
          </p>
          <p className="text-xs text-muted-foreground">
            This action cannot be undone.
          </p>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setShowConfirm(false)}
              disabled={loading}
              className="btn-secondary px-3 py-1.5 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={deleteDocument}
              disabled={loading}
              className="btn-destructive px-3 py-1.5 text-xs flex items-center gap-1"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-3">

          <button
            onClick={viewDocument}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="h-4 w-4" />

            View

          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="btn-destructive flex items-center gap-2"
          >

            <Trash2 className="h-4 w-4" />

            Delete

          </button>

        </div>
      )}

    </div>
  );
}