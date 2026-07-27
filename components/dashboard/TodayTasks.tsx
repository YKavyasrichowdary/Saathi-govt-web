"use client";

import TaskItem from "./TaskItem";

export default function TodayTasks() {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Today's Tasks
          </h2>

          <p className="text-sm text-muted-foreground">
            Complete these missions to improve your career profile.
          </p>

        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          2 / 4 Completed
        </span>

      </div>

      <div className="space-y-4">

        <TaskItem
          title="Complete Resume Review"
          description="Fix ATS formatting and improve technical skills."
          duration="15 mins"
          reward="+5 Resume Score"
          priority="High"
        />

        <TaskItem
          completed
          title="Complete Profile"
          description="Your education profile is complete."
          duration="Done"
          reward="+2 Profile Score"
          priority="Low"
        />

        <TaskItem
          title="Apply to Google STEP"
          description="High match internship based on your profile."
          duration="10 mins"
          reward="+1 Application"
          priority="High"
        />

      </div>

    </div>
  );
}