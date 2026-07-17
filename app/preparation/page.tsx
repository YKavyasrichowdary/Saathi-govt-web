import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

import {
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Preparation Planner · SAATHI",
  description:
    "A calm, weekly plan built around your goals and your real schedule.",
  robots: {
    index: false,
    follow: false,
  },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PLAN = [
  {
    day: 0,
    blocks: [
      {
        time: "6:00",
        subject: "Physics · Rotational Motion",
        dur: "60 min",
        done: true,
      },
      {
        time: "17:00",
        subject: "Reading · The Hindu",
        dur: "20 min",
        done: true,
      },
    ],
  },
  {
    day: 1,
    blocks: [
      {
        time: "6:00",
        subject: "Chemistry · Organic — Alkenes",
        dur: "75 min",
        done: true,
      },
      {
        time: "18:00",
        subject: "Mock: 20Q Chem",
        dur: "30 min",
        done: false,
      },
    ],
  },
  {
    day: 2,
    blocks: [
      {
        time: "6:00",
        subject: "Math · Coordinate Geo",
        dur: "60 min",
        done: false,
      },
      {
        time: "17:00",
        subject: "Revision · Physics",
        dur: "45 min",
        done: false,
      },
    ],
  },
  {
    day: 3,
    blocks: [
      {
        time: "6:00",
        subject: "Chemistry · Inorganic",
        dur: "60 min",
        done: false,
      },
    ],
  },
  {
    day: 4,
    blocks: [
      {
        time: "7:00",
        subject: "Full-length Mock",
        dur: "3 hr",
        done: false,
      },
    ],
  },
  {
    day: 5,
    blocks: [
      {
        time: "10:00",
        subject: "Review mock · weak areas",
        dur: "2 hr",
        done: false,
      },
    ],
  },
  {
    day: 6,
    blocks: [
      {
        time: "—",
        subject: "Rest. Reflect. Reset.",
        dur: "—",
        done: false,
      },
    ],
  },
];

export default function PreparationPage() {
  return (
    <AppShell
      title="Preparation Planner"
      subtitle="Week of 10 – 16 November · JEE Main Session 1"
    >
      {/* Summary Cards */}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-eyebrow">
            Focus this week
          </div>

          <div className="mt-2 text-xl font-bold text-foreground">
            Organic Chemistry
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Your mock accuracy is 48% here.
            Target: 65% by Sunday.
          </p>
        </Card>

        <Card>
          <div className="text-eyebrow">
            Total time planned
          </div>

          <div className="mt-2 text-xl font-bold text-foreground">
            14 hrs · 45 min
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Built around your "1 hr / day" preference.
          </p>
        </Card>

        <Card>
          <div className="text-eyebrow">
            Confidence trend
          </div>

          <div className="mt-2 text-xl font-bold text-secondary">
            ↑ Rising
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            You've completed 6 of 8 planned sessions.
          </p>
        </Card>
      </div>

      <SectionTitle title="This week" />

      <div className="grid gap-3 md:grid-cols-7">
        {DAYS.map((day, index) => {
          const dayPlan = PLAN.find(
            (plan) => plan.day === index
          );

          const isToday = index === 2;

          return (
            <div
              key={day}
              className={`surface-card p-4 ${
                isToday
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-foreground">
                  {day}
                </div>

                {isToday && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Today
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-2">
                {dayPlan?.blocks.map((block, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-surface/70 p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {block.done ? (
                        <CheckCircle2 className="h-3 w-3 text-secondary" />
                      ) : (
                        <Circle className="h-3 w-3" />
                      )}

                      <Clock className="h-3 w-3" />

                      {block.time}
                    </div>

                    <div
                      className={`mt-1 font-semibold ${
                        block.done
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {block.subject}
                    </div>

                    <div className="text-muted-foreground">
                      {block.dur}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}