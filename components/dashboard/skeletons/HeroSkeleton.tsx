export default function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/20 p-8 animate-pulse">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_320px]">
        <div className="space-y-4">
          <div className="h-6 w-24 rounded-full bg-muted" />
          <div className="h-10 w-3/4 rounded-xl bg-muted" />
          <div className="h-5 w-full rounded-lg bg-muted" />
          <div className="h-5 w-2/3 rounded-lg bg-muted" />

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="h-16 w-32 rounded-xl bg-muted" />
            <div className="h-16 w-36 rounded-xl bg-muted" />
            <div className="h-16 w-24 rounded-xl bg-muted" />
          </div>

          <div className="mt-8 h-20 w-full rounded-2xl bg-muted" />
        </div>

        <div className="flex items-center justify-center">
          <div className="h-56 w-56 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
