import { ArrowUpRight, Target } from "lucide-react";

interface ReadinessGaugeProps {
  readinessScore: number;
  targetScore: number;
}

export default function ReadinessGauge({
  readinessScore,
  targetScore,
}: ReadinessGaugeProps) {
  const improvement = targetScore - readinessScore;

  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Target className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-primary font-semibold">
            Readiness Score
          </p>

          <h2 className="text-2xl font-bold">
            Your Growth Potential
          </h2>
        </div>

      </div>

      <div className="mt-8">

        <div className="flex items-center justify-between">

          <span className="text-muted-foreground">
            Current Readiness
          </span>

          <span className="text-xl font-bold">
            {readinessScore}%
          </span>

        </div>

        <div className="mt-3 h-4 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${readinessScore}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-10">

        <div className="flex items-center justify-between">

          <span className="text-muted-foreground">
            AI Target
          </span>

          <span className="text-xl font-bold">
            {targetScore}%
          </span>

        </div>

        <div className="mt-3 h-4 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${targetScore}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

        <div className="flex items-center gap-3">

          <ArrowUpRight className="h-5 w-5 text-green-500" />

          <div>

            <p className="text-sm text-muted-foreground">
              Expected Improvement
            </p>

            <h3 className="text-2xl font-bold text-green-500">
              +{improvement}%
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}