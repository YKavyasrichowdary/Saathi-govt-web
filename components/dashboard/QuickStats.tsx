"use client";

import {
  Bookmark,
  FileText,
  Briefcase,
  Trophy,
} from "lucide-react";
interface Props {
  stats: {
    documents: number;
    applications: number;
    saved: number;
    analyses: number;
  };
}

import StatCard from "./StatCard";

export default function QuickStats({
  stats,
}: Props) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Quick Stats
        </h2>

        <p className="text-sm text-muted-foreground">
          Your activity at a glance.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          icon={<Bookmark className="h-5 w-5" />}
          label="Saved"
          value={stats.saved.toString()}
          color="bg-indigo-100 text-indigo-600"
        />

        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Applied"
          value={stats.applications.toString()}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Documents"
          value={stats.documents.toString()}
          color="bg-amber-100 text-amber-600"
        />

        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Completed"
          value={stats.analyses.toString()}
          color="bg-pink-100 text-pink-600"
        />

      </div>

    </div>
  );
}