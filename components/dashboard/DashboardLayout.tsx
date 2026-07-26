"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  hero: ReactNode;
  tasks: ReactNode;
  streak: ReactNode;
  stats: ReactNode;
  profile: ReactNode;
  resume: ReactNode;
  recommendations: ReactNode;
  insights: ReactNode;
  activity: ReactNode;
}

export default function DashboardLayout({
  hero,
  tasks,
  streak,
  stats,
  profile,
  resume,
  recommendations,
  insights,
  activity,
}: DashboardLayoutProps) {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <section>{hero}</section>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-12">

        {/* Left */}
        <div className="space-y-6 xl:col-span-8">

          {tasks}

          <div className="grid gap-6 lg:grid-cols-2">
            {stats}
            {profile}
          </div>

          {resume}

          {recommendations}

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 xl:col-span-4">

          {streak}

          {insights}

          {activity}

        </div>

      </div>

    </div>
  );
}