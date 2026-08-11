interface TodayTask {
  id: string;
  title: string;
  description?: string | null;
  estimatedMinutes: number;
  rewardXP: number;
  status: string;
}

interface TodayPlanProps {
  dayNumber: number | null;
  date: string | null;
  tasks: TodayTask[];
  dailyCapacity?: number;
}

export default function TodayPlan({
  dayNumber,
  date,
  tasks,
  dailyCapacity,
}: TodayPlanProps) {
  if (dayNumber === null) {
    return (
      <section className="surface-card rounded-3xl border border-border p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Target Date
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          🎉 All preparation tasks completed
        </h2>

        <p className="mt-2 text-muted-foreground">
          You've finished all tasks in your preparation roadmap!
        </p>
      </section>
    );
  }

  const completedMinutes = tasks
    .filter((task) => task.status === "COMPLETED")
    .reduce(
      (total, task) => total + task.estimatedMinutes,
      0
    );

  const plannedMinutes = tasks.reduce(
    (total, task) => total + task.estimatedMinutes,
    0
  );

  return (
    <section className="surface-card rounded-3xl border border-border p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Today's Plan
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Day {dayNumber}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {date}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">
            {completedMinutes > 0
              ? `${completedMinutes} / ${dailyCapacity ?? plannedMinutes} min completed`
              : `${plannedMinutes} / ${dailyCapacity ?? plannedMinutes} min planned`}
          </p>

          {dailyCapacity ? (
            <p className="text-xs text-muted-foreground">
              {dailyCapacity} min capacity
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Planned for today
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tasks scheduled for today.
          </p>
        ) : (
          tasks.map((task) => {
            const isCompleted = task.status === "COMPLETED";
            return (
              <div
                key={task.id}
                className={`rounded-2xl border p-4 transition-all ${
                  isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 text-muted-foreground"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-medium">
                      {task.estimatedMinutes} min
                    </p>

                    <p className={`text-xs ${isCompleted ? "text-emerald-500 font-semibold" : "text-primary"}`}>
                      {isCompleted ? "✓ Completed" : `+${task.rewardXP} XP`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${
              dailyCapacity && dailyCapacity > 0
                ? Math.min(100, (completedMinutes / dailyCapacity) * 100)
                : plannedMinutes > 0
                ? Math.min(100, (completedMinutes / plannedMinutes) * 100)
                : 0
            }%`,
          }}
        />
      </div>
    </section>
  );
}