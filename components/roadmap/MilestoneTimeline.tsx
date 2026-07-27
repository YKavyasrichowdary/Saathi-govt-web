import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

type MilestoneStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "PENDING";

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export default function MilestoneTimeline({
  milestones,
}: MilestoneTimelineProps) {
  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="mb-8">

        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Progress Journey
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Milestones
        </h2>

      </div>

      <div className="space-y-6">

        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="flex gap-5"
          >

            <div className="flex flex-col items-center">

              {milestone.status === "COMPLETED" && (
                <CheckCircle2 className="h-7 w-7 text-primary" />
              )}

              {milestone.status === "IN_PROGRESS" && (
                <Clock3 className="h-7 w-7 text-primary" />
              )}

              {milestone.status === "PENDING" && (
                <Circle className="h-7 w-7 text-muted-foreground" />
              )}

              {index !== milestones.length - 1 && (
                <div className="mt-2 h-14 w-px bg-border" />
              )}

            </div>

            <div className="flex-1 pb-8">

              <h3 className="text-lg font-semibold">
                {milestone.title}
              </h3>

              <p className="mt-2 text-muted-foreground">
                {milestone.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}