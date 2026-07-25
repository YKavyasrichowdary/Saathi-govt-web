"use client";

import ScoreCard from "@/components/ui/ScoreCard";

interface Props {
  overallScore: number;
  atsScore: number;
}

function getResumeDetails(score: number) {
  if (score >= 90)
    return {
      label: "Outstanding",
      subtitle: "Top-tier resume ready for high-competitiveness roles",
    };
  if (score >= 80)
    return {
      label: "Excellent",
      subtitle: "Competitive for most internship & entry-level applications",
    };
  if (score >= 70)
    return {
      label: "Strong",
      subtitle: "Solid base with room for targeted impact enhancements",
    };
  if (score >= 60)
    return {
      label: "Good",
      subtitle: "A few key improvements could raise your score significantly",
    };
  return {
    label: "Needs Improvement",
    subtitle: "Requires structural and content updates to stand out",
  };
}

function getATSDetails(score: number) {
  if (score >= 90)
    return {
      label: "Highly ATS Friendly",
      subtitle: "Parses effortlessly across all major ATS screeners",
    };
  if (score >= 80)
    return {
      label: "ATS Friendly",
      subtitle: "Well-structured layout for automated recruiter screening",
    };
  if (score >= 70)
    return {
      label: "Good Compatibility",
      subtitle: "Standard formatting, minor keyword additions recommended",
    };
  if (score >= 60)
    return {
      label: "Moderate Compatibility",
      subtitle: "Some section headings or formatting may cause parsing delays",
    };
  return {
    label: "Low Compatibility",
    subtitle: "Formatting issues may prevent automated indexers from reading skills",
  };
}

export default function ScoreOverview({ overallScore, atsScore }: Props) {
  const resume = getResumeDetails(overallScore);
  const ats = getATSDetails(atsScore);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ScoreCard
        title="Resume Score"
        score={overallScore}
        description={resume.label}
        subtitle={resume.subtitle}
        variant={
          overallScore >= 80
            ? "success"
            : overallScore >= 60
            ? "warning"
            : "danger"
        }
      />

      <ScoreCard
        title="ATS Score"
        score={atsScore}
        description={ats.label}
        subtitle={ats.subtitle}
        variant={
          atsScore >= 80
            ? "primary"
            : atsScore >= 60
            ? "warning"
            : "danger"
        }
      />
    </div>
  );
}