import {
  ArrowRight,
  Clock3,
  Trophy,
  Target,
} from "lucide-react";

interface TodayMissionCardProps {
  title: string;
  description: string;
  estimatedMinutes: number;
  rewardXP: number;
}

export default function TodayMissionCard({
  title,
  description,
  estimatedMinutes,
  rewardXP,
}: TodayMissionCardProps) {
  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Target className="h-6 w-6" />
        </div>

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Today's Mission
          </p>

          <h2 className="text-2xl font-bold">
            Your Next Best Action
          </h2>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-border p-6">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-3 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-6">

          <div className="flex items-center gap-2">

            <Clock3 className="h-5 w-5 text-primary" />

            <span>{estimatedMinutes} mins</span>

          </div>

          <div className="flex items-center gap-2">

            <Trophy className="h-5 w-5 text-primary" />

            <span>+{rewardXP} XP</span>

          </div>

        </div>

        <button className="btn-primary mt-8 inline-flex items-center gap-2">

          Start Mission

          <ArrowRight className="h-4 w-4" />

        </button>

      </div>

    </section>
  );
}