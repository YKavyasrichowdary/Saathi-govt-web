"use client";

import ErrorState from "@/components/common/ErrorState";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <ErrorState
        title="Something Went Wrong"
        description={error.message || "An unexpected error occurred while loading your dashboard."}
        action={
          <button onClick={() => reset()} className="btn-primary px-6 py-2">
            Try Again
          </button>
        }
      />
    </div>
  );
}
