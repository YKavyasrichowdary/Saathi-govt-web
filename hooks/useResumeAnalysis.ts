"use client";

import { useEffect, useState } from "react";

import resumeAnalysisClient from "@/services/resume-analysis.client";

import { ResumeAnalysis } from "@/types/resume";

export function useResumeAnalysis(
  analysisId: string
) {
  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!analysisId) return;

    async function load() {
      try {
        setLoading(true);

        const result =
          await resumeAnalysisClient.getAnalysis(
            analysisId
          );

        setAnalysis(result as ResumeAnalysis);

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [analysisId]);

  return {
    analysis,
    loading,
    error,
  };
}