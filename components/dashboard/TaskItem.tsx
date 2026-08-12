"use client";

import { Clock3, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  completed?: boolean;
  priority?: "High" | "Medium" | "Low";
  onComplete?: (id: string) => void;
  completing?: boolean;
}

export default function TaskItem({
  id,
  title,
  description,
  duration,
  reward,
  completed = false,
  priority = "Medium",
  onComplete,
  completing = false,
}: TaskItemProps) {
  const priorityColor = {
    High:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Low:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-background p-4"
    >
      <div className="flex gap-4">

        <div className="mt-1">
          <button
            type="button"
            disabled={completed || completing}
            onClick={() => onComplete?.(id)}
            aria-label={
              completed
                ? "Task completed"
                : "Complete task"
            }
            className="rounded-full transition-transform hover:scale-105 disabled:cursor-default"
          >
            {completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : completing ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-primary hover:bg-primary/10" />
            )}
          </button>
        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold">
              {title}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColor[priority]}`}
            >
              {priority}
            </span>

          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              {duration}
            </div>

            <div className="flex items-center gap-2 text-primary font-medium">
              <Sparkles className="h-4 w-4" />
              {reward}
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}