"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/PageBits";
import {
  Search,
  MessageCircleHeart,
  LifeBuoy,
  BookOpen,
  Mail,
  ChevronDown,
} from "lucide-react";

const FAQS = [
  {
    q: "Is SAATHI really free for students?",
    a: "Yes. Every core feature — opportunities, planner, mocks, applications — is free. We're funded by partner organisations and government schemes, never by selling your data.",
  },
  {
    q: "How does SAATHI decide which scholarships to show me?",
    a: "Only from what you shared during onboarding — class, state, income bracket, dreams. Never based on browsing or third-party trackers.",
  },
  {
    q: "Can my parents see my journey?",
    a: "Only if you invite them. You can share a read-only 'Parent View' link with a single click, and revoke it anytime.",
  },
  {
    q: "What if I miss a deadline?",
    a: "SAATHI reminds you 14, 7, 3 and 1 day before. If you miss one, we automatically surface similar opportunities so you don't lose momentum.",
  },
  {
    q: "How is my data protected?",
    a: "Documents are encrypted at rest and in transit. You can download or delete everything at any time from Profile → Privacy.",
  },
];

export default function HelpClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <AppShell
      title="Help Center"
      subtitle="Real answers, real humans, real fast."
    >
      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search guides, FAQs, or 'How do I…'"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Help Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: <BookOpen className="h-5 w-5" />,
            title: "Getting started guide",
            note: "10 min · Text + video",
          },
          {
            icon: <MessageCircleHeart className="h-5 w-5" />,
            title: "Chat with your companion",
            note: "Instant · in-app",
          },
          {
            icon: <LifeBuoy className="h-5 w-5" />,
            title: "Talk to a human",
            note: "Mon–Sat · 9am–9pm IST",
          },
        ].map((card) => (
          <Card
            key={card.title}
            className="flex items-start gap-3 bg-gradient-to-br from-sky-soft/50 to-transparent"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {card.icon}
            </span>

            <div>
              <div className="text-sm font-semibold text-foreground">
                {card.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {card.note}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <h2 className="mb-3 text-lg font-bold text-foreground">
        Common questions
      </h2>

      <div className="space-y-2">
        {FAQS.map((faq, index) => {
          const isOpen = open === index;

          return (
            <div
              key={index}
              className="surface-card overflow-hidden p-0"
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span className="text-sm font-semibold text-foreground">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact */}
      <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/10 via-sky-soft to-gold-soft/70 p-8 text-center">
        <Mail className="mx-auto h-6 w-6 text-primary" />

        <h3 className="mt-3 text-lg font-bold text-foreground">
          Still stuck? Someone real will help.
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Write to us at hello@saathi.app — average reply time is under 4 hours.
        </p>
      </div>
    </AppShell>
  );
}
