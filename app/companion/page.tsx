"use client";

import { useState } from "react";
import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";

import {
  Send,
  Sparkles,
  FileText,
  Compass,
  BookOpen,
} from "lucide-react";

type Msg = {
  from: "you" | "saathi";
  text: string;
};

// NOTE:
// Client Components cannot export `metadata`.
// Move this to a parent layout or a separate server page if needed.
// export const metadata: Metadata = {
//   title: "AI Companion · SAATHI",
//   description:
//     "Ask anything. Get calm, personalised guidance from your companion.",
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

export default function CompanionPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "saathi",
      text: "Good to see you again, Ananya. Want to keep working on your NMMS essay, or something new today?",
    },
  ]);

  const [text, setText] = useState("");

  const suggestions = [
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Help me write my scholarship essay",
    },
    {
      icon: <Compass className="h-4 w-4" />,
      label: "Which scholarship should I apply for this month?",
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Plan my week for JEE prep",
    },
  ];

  function send(message?: string) {
    const value = (message ?? text).trim();

    if (!value) return;

    setMsgs((messages) => [
      ...messages,
      {
        from: "you",
        text: value,
      },
      {
        from: "saathi",
        text:
          "Let's take this one step at a time. I'll draft a starting point and we can shape it together — this stays private to you.",
      },
    ]);

    setText("");
  }

  return (
    <AppShell
      title="AI Companion"
      subtitle="Private. Patient. Never in a hurry."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Chat */}

        <div className="surface-card flex h-[68vh] flex-col overflow-hidden p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {msgs.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "you"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === "you"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {msgs.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-muted/40 px-6 py-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  onClick={() => send(suggestion.label)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground hover:border-primary/40"
                >
                  {suggestion.icon}

                  {suggestion.label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border p-4"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell SAATHI what's on your mind..."
              className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <button
              type="submit"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_-10px_oklch(0.55_0.2_262/0.6)]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Sidebar */}

        <div className="space-y-4">
          <div className="surface-card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              What SAATHI knows about you
            </div>

            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li>• Class 12, preparing for JEE Main</li>
              <li>• Family income under ₹4L — scheme-eligible</li>
              <li>• Prefers 1h focused sessions</li>
              <li>• Weak on organic chemistry</li>
            </ul>

            <p className="mt-4 text-[11px] text-muted-foreground">
              Everything you share stays private. SAATHI never sells your data.
            </p>
          </div>

          <div className="surface-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Recent workspaces
            </div>

            <ul className="mt-3 space-y-2 text-sm">
              <li className="rounded-lg border border-border p-3">
                NMMS essay — draft v2
              </li>

              <li className="rounded-lg border border-border p-3">
                Weekly JEE plan — 11 Nov
              </li>

              <li className="rounded-lg border border-border p-3">
                Resume for Microsoft Engage
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}