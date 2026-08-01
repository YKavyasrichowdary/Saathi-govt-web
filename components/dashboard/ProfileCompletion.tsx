"use client";

import ProfileCompletionCard from "./ProfileCompletionCard";

interface ProfileCompletionProps {
  completion: {
    percentage: number;
    remaining: string[];
  };
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
