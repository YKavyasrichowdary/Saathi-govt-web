import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Rocket,
} from "lucide-react";

import ScoreCard from "@/components/common/ScoreCard";
import InsightSection from "@/components/common/InsightSection";
import ResumeSummary from "./ResumeSummary";

import { ResumeAnalysis } from "@/types/resume";

interface Props {
  analysis: ResumeAnalysis;
}

export default function ResumeReview({
  analysis,
}: Props) {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Resume Review
        </h1>

        <p className="mt-2 text-muted-foreground">
          AI-powered analysis of your latest resume.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <ScoreCard
          title="Overall Score"
          score={analysis.overallScore}
          subtitle="Resume Quality"
        />

        <ScoreCard
          title="ATS Score"
          score={analysis.atsScore}
          subtitle="ATS Compatibility"
        />

      </div>

      <InsightSection
        title="Strengths"
        items={analysis.strengths}
        icon={
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        }
      />

      <InsightSection
        title="Weaknesses"
        items={analysis.weaknesses}
        icon={
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        }
      />

      <InsightSection
        title="Missing Skills"
        items={analysis.missingSkills}
        icon={
          <Brain className="h-5 w-5 text-purple-600" />
        }
      />

      <InsightSection
        title="Suggested Improvements"
        items={analysis.improvements}
        icon={
          <Rocket className="h-5 w-5 text-blue-600" />
        }
      />

      <ResumeSummary
        summary={analysis.summary}
      />

    </div>
  );
}