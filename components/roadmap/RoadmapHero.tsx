import {
  Brain,
  CalendarDays,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface RoadmapHeroProps {
  title: string;
  readinessScore: number;
  targetScore: number;
  estimatedDays: number;
}

export default function RoadmapHero({
  title,
  readinessScore,
  targetScore,
  estimatedDays,
}: RoadmapHeroProps) {
  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-primary/10 p-4 text-primary">
              <Brain className="h-8 w-8" />
            </div>

            <div>

              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                AI Success Plan
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {title}
              </h1>

            </div>

          </div>

          <p className="mt-6 max-w-2xl text-muted-foreground">
            A personalized execution strategy generated from your profile,
            resume, skills, and opportunity requirements.
          </p>

        </div>

      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">

        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Current Readiness"
          value={`${readinessScore}%`}
        />

        <StatCard
          icon={<Sparkles className="h-5 w-5" />}
          label="Potential"
          value={`${targetScore}%`}
        />

        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Duration"
          value={`${estimatedDays} Days`}
        />

      </div>

    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5">

      <div className="flex items-center gap-3 text-primary">
        {icon}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {label}
      </p>

      <h2 className="mt-1 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}