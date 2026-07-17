import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Applications · SAATHI",
  description:
    "Track every application from draft to result — no more missed deadlines.",
  robots: {
    index: false,
    follow: false,
  },
};

const STAGES = [
  {
    name: "Drafting",
    color: "bg-muted",
    items: [
      {
        title: "INSPIRE Scholarship",
        note: "3 sections left",
        due: "Due 15 Dec",
      },
    ],
  },
  {
    name: "Ready to Submit",
    color: "bg-sky-soft",
    items: [
      {
        title: "NMMS 2026",
        note: "68% · one doc pending",
        due: "Due 21 Nov",
      },
      {
        title: "SIH 2026",
        note: "Team registered",
        due: "Due 3 Dec",
      },
    ],
  },
  {
    name: "Submitted",
    color: "bg-mint-soft",
    items: [
      {
        title: "KVPY",
        note: "Confirmation received",
        due: "Result 20 Dec",
      },
      {
        title: "Post-Matric SC Scholarship",
        note: "Awaiting institute verify",
        due: "Result Jan",
      },
    ],
  },
  {
    name: "Result / Outcome",
    color: "bg-gold-soft",
    items: [
      {
        title: "Tata Trusts (2024)",
        note: "Selected · ₹1.2L awarded",
        due: "Completed",
      },
    ],
  },
];

export default function ApplicationsPage() {
  return (
    <AppShell
      title="Applications"
      subtitle="6 in progress · 2 need you today"
    >
      <SectionTitle
        eyebrow="Kanban"
        title="Your applications"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage) => (
          <div
            key={stage.name}
            className="rounded-2xl border border-border bg-muted/40 p-3"
          >
            <div className="mb-3 flex items-center justify-between px-2">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                {stage.name}
              </div>

              <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {stage.items.length}
              </span>
            </div>

            <div className="space-y-2">
              {stage.items.map((item) => (
                <Card
                  key={item.title}
                  className={`p-3 ${stage.color}/50`}
                >
                  <div className="text-sm font-semibold text-foreground">
                    {item.title}
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.note}
                  </div>

                  <div className="mt-2 text-[11px] font-semibold text-foreground/80">
                    {item.due}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}