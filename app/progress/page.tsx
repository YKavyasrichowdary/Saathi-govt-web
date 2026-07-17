import { AppShell } from "@/components/AppShell";
import { Card, StatCard, SectionTitle } from "@/components/PageBits";
import { Flame, Trophy, Star } from "lucide-react";

export const metadata = {
  title: "Progress & Streaks | SAATHI",
  description:
    "Celebrate every small win. Consistency beats intensity.",
};

export default function ProgressPage() {
  return (
    <AppShell
      title="Progress & Streaks"
      subtitle="Celebrate the small things. They build the big ones."
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          label="Current streak"
          value="14 days"
          tone="accent"
          hint="Longest yet — beat by 3."
        />

        <StatCard
          label="Hours studied"
          value="86h"
          tone="primary"
          hint="This month"
        />

        <StatCard
          label="Applications"
          value="6"
          tone="secondary"
          hint="1 selected"
        />

        <StatCard
          label="Mock avg"
          value="68%"
          tone="primary"
          hint="+11% vs last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Activity Heatmap */}
        <Card>
          <SectionTitle
            eyebrow="Consistency"
            title="Your last 12 weeks"
          />

          <div className="grid grid-cols-12 gap-1.5">
            {Array.from({ length: 84 }).map((_, i) => {
              const intensity = Math.max(
                0,
                Math.min(
                  4,
                  Math.round(Math.sin(i / 7) * 2 + 2 + (i > 60 ? 1 : 0))
                )
              );

              const bg =
                intensity === 0
                  ? "bg-muted"
                  : intensity === 1
                  ? "bg-primary/20"
                  : intensity === 2
                  ? "bg-primary/40"
                  : intensity === 3
                  ? "bg-primary/70"
                  : "bg-primary";

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${bg}`}
                />
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            Less

            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-sm bg-muted" />
              <div className="h-3 w-3 rounded-sm bg-primary/20" />
              <div className="h-3 w-3 rounded-sm bg-primary/40" />
              <div className="h-3 w-3 rounded-sm bg-primary/70" />
              <div className="h-3 w-3 rounded-sm bg-primary" />
            </div>

            More
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <SectionTitle
            eyebrow="Milestones"
            title="Badges earned"
          />

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                name: "First mock",
                icon: <Trophy className="h-5 w-5" />,
                done: true,
              },
              {
                name: "7-day streak",
                icon: <Flame className="h-5 w-5" />,
                done: true,
              },
              {
                name: "First scholarship",
                icon: <Star className="h-5 w-5" />,
                done: true,
              },
              {
                name: "30-day streak",
                icon: <Flame className="h-5 w-5" />,
                done: false,
              },
              {
                name: "100 hours",
                icon: <Trophy className="h-5 w-5" />,
                done: false,
              },
              {
                name: "5 apps done",
                icon: <Star className="h-5 w-5" />,
                done: false,
              },
            ].map((badge) => (
              <div
                key={badge.name}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center text-xs ${
                  badge.done
                    ? "border-accent/40 bg-gold-soft/60 text-foreground"
                    : "border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    badge.done
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface"
                  }`}
                >
                  {badge.icon}
                </span>

                <span className="font-semibold">{badge.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}