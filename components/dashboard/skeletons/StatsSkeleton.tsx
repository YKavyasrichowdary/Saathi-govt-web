export default function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 rounded-3xl border border-border bg-muted/20 p-6 space-y-3">
          <div className="h-4 w-20 rounded-lg bg-muted" />
          <div className="h-8 w-12 rounded-lg bg-muted" />
        </div>
      ))}
    </div>
  );
}
