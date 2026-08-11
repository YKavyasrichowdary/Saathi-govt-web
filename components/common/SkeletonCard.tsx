interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({
  className = "",
}: SkeletonCardProps) {
  return (
    <div
      className={`animate-pulse rounded-3xl border border-border bg-muted ${className}`}
    />
  );
}
