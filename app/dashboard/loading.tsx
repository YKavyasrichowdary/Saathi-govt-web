import SkeletonCard from "@/components/common/SkeletonCard";

export default function Loading() {
  return (
    <div className="space-y-6">
      <SkeletonCard className="h-48 w-full" />

      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonCard className="h-80" />
        <SkeletonCard className="h-80" />
        <SkeletonCard className="h-80" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonCard className="h-96" />
        <SkeletonCard className="h-96" />
      </div>
    </div>
  );
}
