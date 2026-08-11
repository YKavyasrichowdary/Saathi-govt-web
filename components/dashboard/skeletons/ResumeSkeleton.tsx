export default function ResumeSkeleton() {
  return (
    <div className="surface-card rounded-3xl border border-border p-6 animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded-lg bg-muted" />
          <div className="h-4 w-56 rounded-lg bg-muted" />
        </div>
        <div className="h-12 w-12 rounded-full bg-muted" />
      </div>

      <div className="h-4 w-full rounded-full bg-muted" />

      <div className="grid grid-cols-2 gap-4">
        <div className="h-20 rounded-2xl bg-muted/40" />
        <div className="h-20 rounded-2xl bg-muted/40" />
      </div>
    </div>
  );
}
