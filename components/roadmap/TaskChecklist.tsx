"use client";

import {
  CheckCircle2,
  Circle,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

interface TaskChecklistProps {
  title: string;
  tasks: Task[];
}

export default function TaskChecklist({
  title,
  tasks,
}: TaskChecklistProps) {
  const router = useRouter();

  const [taskState, setTaskState] =
    useState(tasks);

  useEffect(() => {
    setTaskState(tasks);
  }, [tasks]);

  const [loadingTaskId, setLoadingTaskId] =
    useState<string | null>(null);

  const completed =
    taskState.filter(
      (task) => task.completed
    ).length;

  async function completeTask(
    taskId: string
  ) {
    try {
      setLoadingTaskId(taskId);

      const response = await fetch(
        `/api/roadmap/tasks/${taskId}/complete`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to complete task."
        );
      }

      setTaskState((current) =>
        current.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: true,
              }
            : task
        )
      );

      router.refresh();

    } catch (error) {
      console.error(
        "Task completion error:",
        error
      );
    } finally {
      setLoadingTaskId(null);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Task Checklist
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {title}
          </h2>
        </div>

        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {completed}/{taskState.length} Completed
        </span>
      </div>

      <div className="mt-8 space-y-4">
        {taskState.map((task) => {
          const isLoading =
            loadingTaskId === task.id;

          return (
            <button
              key={task.id}
              type="button"
              disabled={
                task.completed || isLoading
              }
              onClick={() =>
                completeTask(task.id)
              }
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                task.completed
                  ? "border-primary/20 bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/30"
              } ${
                isLoading
                  ? "cursor-wait opacity-60"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {task.completed ? (
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                )}

                <div>
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "text-muted-foreground line-through"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {task.estimatedMinutes} mins
                  </p>
                </div>
              </div>

              {isLoading && (
                <span className="text-xs text-muted-foreground">
                  Updating...
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}