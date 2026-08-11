"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

interface AnalyzeMatchButtonProps {
  opportunityId: string;
}

export default function AnalyzeMatchButton({
  opportunityId,
}: AnalyzeMatchButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeMatch() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/opportunities/${opportunityId}/match`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to analyze your match."
        );
      }

      router.push(
        `/opportunities/${opportunityId}/match`
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={analyzeMatch}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Sparkles className="h-4 w-4" />

        {loading
          ? "Analyzing your match..."
          : "Analyze My Match"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}