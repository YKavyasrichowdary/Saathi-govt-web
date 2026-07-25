import { notFound } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import ResumeReview from "@/components/resume/ResumeReview";

import resumeAnalysisStorageService from "@/services/resume/resume-analysis-storage.service";

interface Props {
  params: Promise<{
    analysisId: string;
  }>;
}

export default async function ResumeReviewPage({
  params,
}: Props) {
  const { analysisId } = await params;

  let analysis;

  try {
    analysis =
      await resumeAnalysisStorageService.getAnalysis(
        analysisId
      );
  } catch {
    notFound();
  }

  return (
    <AppShell
      title="Resume Review"
      subtitle={`Analysis #${analysis.version}`}
    >
      <ResumeReview
        analysis={{
          overallScore: analysis.overallScore,

          atsScore: analysis.atsScore,

          strengths:
            analysis.strengths as string[],

          weaknesses:
            analysis.weaknesses as string[],

          missingSkills:
            analysis.missingSkills as string[],

          improvements:
            analysis.improvements as string[],

          summary: analysis.summary,
        }}
      />
    </AppShell>
  );
}