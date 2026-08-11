"use client";

import ProfileCompletionCard from "./ProfileCompletionCard";

interface ProfileCompletion {
  percentage: number;
  remaining: string[];
}

interface ProfileCompletionProps {
  completion: ProfileCompletion;
}

export default function ProfileCompletion({
  completion,
}: ProfileCompletionProps) {
  return (
    <ProfileCompletionCard
      percentage={completion.percentage}
      remaining={completion.remaining}
    />
  );
}
