export default function TasksSkeleton() {
  return (
    <div className="surface-card rounded-3xl border border-border p-6 animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-36 rounded-lg bg-muted" />
          <div className="h-4 w-64 rounded-lg bg-muted" />
        </div>
        <div className="h-7 w-28 rounded-full bg-muted" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl border border-border bg-muted/30" />
        ))}
      </div>
    </div>
  );
}
