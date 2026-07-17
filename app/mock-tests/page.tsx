import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle, StatCard } from "@/components/PageBits";

import {
  Play,
  TrendingUp,
  Trophy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mock Tests · SAATHI",
  description:
    "Full-length and topic-wise mocks — with a report that actually helps.",
  robots: {
    index: false,
    follow: false,
  },
};

const recommendedMocks = [
  {
    title: "JEE Main Full-Length Mock #05",
    dur: "3 hrs · 90Q",
    tag: "Full length",
  },
  {
    title: "Organic Chemistry Sprint",
    dur: "30 min · 20Q",
    tag: "Topic",
  },
  {
    title: "Coordinate Geometry Set",
    dur: "45 min · 25Q",
    tag: "Topic",
  },
  {
    title: "Physics · Rotational Motion",
    dur: "40 min · 20Q",
    tag: "Topic",
  },
];

const history = [
  {
    title: "Mock #04 · Full length",
    date: "6 Nov",
    score: 72,
    trend: "+8",
  },
  {
    title: "Mock #03 · Full length",
    date: "30 Oct",
    score: 64,
    trend: "+3",
  },
  {
    title: "Sprint · Alkenes",
    date: "28 Oct",
    score: 58,
    trend: "+12",
  },
  {
    title: "Mock #02 · Full length",
    date: "23 Oct",
    score: 61,
    trend: "+2",
  },
];

export default function MockTestsPage() {
  return (
    <AppShell
      title="Mock Tests"
      subtitle="Practice like it's real. Learn like it's safe."
    >
      {/* Stats */}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Last score"
          value="72%"
          hint="+8% vs last mock"
          tone="primary"
        />

        <StatCard
          label="Rank estimate"
          value="12,438"
          hint="All-India · JEE Main"
          tone="secondary"
        />

        <StatCard
          label="Weak area"
          value="Organic"
          hint="SAATHI added focus to your plan"
          tone="accent"
        />
      </div>

      {/* Content */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended */}

        <Card>
          <SectionTitle
            eyebrow="Available now"
            title="Recommended for you"
          />

          <ul className="space-y-3">
            {recommendedMocks.map((mock) => (
              <li
                key={mock.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {mock.title}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {mock.tag} · {mock.dur}
                  </div>
                </div>

                <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  <Play className="h-3 w-3" />
                  Start
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* History */}

        <Card>
          <SectionTitle
            eyebrow="History"
            title="Past attempts"
          />

          <div className="space-y-3">
            {history.map((mock) => (
              <div
                key={mock.title}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {mock.title}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {mock.date}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {mock.score}%
                  </div>

                  <div className="flex items-center justify-end gap-1 text-xs font-semibold text-secondary">
                    <TrendingUp className="h-3 w-3" />
                    {mock.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}