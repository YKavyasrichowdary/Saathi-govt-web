"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Trash2,
  Download,
  Sparkles,
  Loader2,
} from "lucide-react";

import resumeAnalysisClient from "@/services/resume-analysis.client";

import { toast } from "sonner";

interface Props {
  document: {
    id: string;
    title: string;
    fileName: string;
    fileSize: number;
    mimeType?: string;
    type?: string;
    createdAt?: string | Date;
  };
  isPrimaryResume: boolean;
}

export default function DocumentCard({
  document,
  isPrimaryResume,
}: Props) {

  const router = useRouter();

 const [loading, setLoading] = useState(false);
const [analyzing, setAnalyzing] = useState(false);
const [settingPrimary, setSettingPrimary] = useState(false);
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

  async function setPrimaryResume() {
  if (settingPrimary || isPrimaryResume) return;

  setSettingPrimary(true);

  try {
    const res = await fetch(
      "/api/documents/primary-resume",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: document.id,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
          "Failed to set primary resume."
      );
    }

    toast.success(
      "Primary resume updated."
    );

    router.refresh();
  } catch (error: any) {
    toast.error(
      error.message ||
        "Failed to set primary resume."
    );
  } finally {
    setSettingPrimary(false);
  }
}

  async function analyzeResume() {
  if (analyzing) return;

  setAnalyzing(true);

  try {
    const analysisId =
      await resumeAnalysisClient.analyzeDocument(
        document.id
      );

    toast.success("Resume analyzed successfully.");

    router.push(
      `/resume-review/${analysisId}`
    );
  } catch (error: any) {
    toast.error(
      error.message || "Failed to analyze resume."
    );
  } finally {
    setAnalyzing(false);
  }
}


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

{document.type === "RESUME" && (
  isPrimaryResume ? (
    <span className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
      <span>★</span>
      Primary Resume
    </span>
  ) : (
    <button
      type="button"
      onClick={setPrimaryResume}
      disabled={settingPrimary}
      className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {settingPrimary
        ? "Setting..."
        : "Set as Primary"}
    </button>
  )
)}

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
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={deleteDocument}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-all flex items-center gap-1 cursor-pointer"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-2.5">
          <button
            onClick={viewDocument}
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            View
          </button>

          {document.type === "RESUME" &&
            document.mimeType === "application/pdf" && (
              <button
                onClick={analyzeResume}
                disabled={analyzing}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-blue-200 animate-pulse" />
                    <span>Analyze with AI</span>
                  </>
                )}
              </button>
            )}

          <button
            onClick={() => setShowConfirm(true)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}

    </div>
  );
}