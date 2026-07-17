import { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

import {
  CheckCircle2,
  Circle,
  Sparkles,
  Milestone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Journey · SAATHI",
  description:
    "The path from where you are to where you dream to be.",
  robots: {
    index: false,
    follow: false,
  },
};

const MILESTONES = [
  {
    title: "Joined SAATHI",
    note: "Told us about your dream to become an engineer.",
    done: true,
    date: "Sep 2025",
  },
  {
    title: "Class 12 Board Prep",
    note: "Physics on track. Chemistry needs 2h/week more.",
    done: true,
    date: "Oct 2025",
  },
  {
    title: "First Scholarship: NMMS",
    note: "Application 68% complete. Two documents left.",
    done: false,
    active: true,
    date: "Nov 2025",
  },
  {
    title: "JEE Main — Session 1",
    note: "Mock 4 of 12 scheduled for this week.",
    done: false,
    date: "Jan 2026",
  },
  {
    title: "College Applications",
    note: "SAATHI will shortlist based on your rank and preferences.",
    done: false,
    date: "Jun 2026",
  },
  {
    title: "Placement Ready",
    note: "Internships, projects, resume — all in one file.",
    done: false,
    date: "2029",
  },
];

export default function JourneyPage() {
  return (
    <AppShell
      title="My Journey"
      subtitle="Every milestone matters. Even the small ones."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Timeline */}

        <Card>
          <SectionTitle
            eyebrow="From here to your dream"
            title="Engineering by 2029"
          />

          <ol className="relative border-l-2 border-dashed border-border pl-8">
            {MILESTONES.map((milestone, index) => (
              <li
                key={index}
                className="relative mb-8 last:mb-0"
              >
                <span
                  className={`absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-4 border-background ${
                    milestone.done
                      ? "bg-secondary text-secondary-foreground"
                      : milestone.active
                      ? "animate-pulse bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {milestone.done ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Milestone className="h-4 w-4" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    className={`text-base font-semibold ${
                      milestone.active
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {milestone.title}
                  </h3>

                  <span className="text-xs font-medium text-muted-foreground">
                    {milestone.date}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {milestone.note}
                </p>

                {milestone.active && (
                  <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    Continue this

                    <Sparkles className="h-3 w-3" />
                  </button>
                )}
              </li>
            ))}
          </ol>
        </Card>

        {/* Sidebar */}

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-accent/25 to-transparent">
            <div className="text-eyebrow">
              A note for you
            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground">
              "You joined SAATHI 62 days ago.
              Since then you've completed 3 mock tests,
              uploaded 4 documents, and moved 30%
              closer to your dream.
              Keep going, Ananya.
              This journey belongs to you."
            </p>

            <div className="mt-4 text-xs font-semibold text-muted-foreground">
              — Your companion
            </div>
          </Card>

          <Card>
            <SectionTitle title="What's next" />

            <ul className="space-y-2 text-sm">
              {[
                "Upload domicile certificate",
                "Schedule NMMS mock test",
                "Talk to a senior mentor",
              ].map((task) => (
                <li
                  key={task}
                  className="flex items-center gap-2"
                >
                  <Circle className="h-4 w-4 text-muted-foreground" />

                  {task}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}