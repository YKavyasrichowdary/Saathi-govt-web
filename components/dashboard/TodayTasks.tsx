"use client";

import { useState } from "react";
import { toast } from "sonner";
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

export default function TodayTasks({ tasks: initialTasks }: TodayTasksProps) {
  const [taskList, setTaskList] = useState<TodayTask[]>(initialTasks ?? []);
  const [completingId, setCompletingId] = useState<string | null>(null);

  async function completeTask(id: string) {
    if (completingId) return;

    setCompletingId(id);

    try {
      const res = await fetch("/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          missionId: id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to complete task."
        );
      }

      toast.success("Today's task completed! 🔥");

      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to complete task."
      );
    } finally {
      setCompletingId(null);
    }
  }

  if (!taskList || taskList.length === 0) {
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

  const completedCount = taskList.filter((t) => t.completed).length;
  const totalCount = taskList.length;

  const orderedTasks = [...taskList].sort((a, b) => {
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
              id={task.id}
              title={task.title}
              description={task.description}
              duration={formattedDuration}
              reward={task.reward}
              completed={task.completed}
              priority={task.priority}
              onComplete={completeTask}
              completing={completingId === task.id}
            />
          );
        })}
      </div>
    </div>
  );
}