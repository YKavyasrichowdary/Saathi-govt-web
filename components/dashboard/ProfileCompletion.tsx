"use client";

import ProfileCompletionCard from "./ProfileCompletionCard";

interface ProfileCompletionProps {
  percentage?: number;
  remaining?: string[];
}

export default function ProfileCompletion({
  percentage = 75,
  remaining = ["Add Skills", "Upload Resume", "Select Target Roles"],
}: ProfileCompletionProps) {
  return (
    <ProfileCompletionCard
      percentage={percentage}
      remaining={remaining}
    />
  );
}
