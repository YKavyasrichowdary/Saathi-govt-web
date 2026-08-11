"use client";

import TaskItem from "./TaskItem";

import EmptyState from "@/components/common/EmptyState";

export interface TodayTask {
  id: string;
  title: string;
  description: string;
  duration?: string;
  estimatedMinutes?: number;
  reward: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

interface TodayTasksProps {
  tasks: TodayTask[];
}

export default function TodayTasks({ tasks }: TodayTasksProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="surface-card rounded-3xl border border-border p-6">
        <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>

        <EmptyState
          title="No Tasks Today"
          description="You're all caught up! Check back tomorrow for new missions."
        />
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  const orderedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Today's Tasks</h2>

          <p className="text-sm text-muted-foreground">
            Complete these missions to improve your career profile.
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {completedCount} / {totalCount} Completed
        </span>
      </div>

      <div className="space-y-4">
        {orderedTasks.map((task) => {
          const formattedDuration =
            task.estimatedMinutes !== undefined
              ? `${task.estimatedMinutes} mins`
              : task.duration ?? "";

          return (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              duration={formattedDuration}
              reward={task.reward}
              completed={task.completed}
              priority={task.priority}
            />
          );
        })}
      </div>
    </div>
  );
}