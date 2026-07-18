
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Compass,
  ShieldCheck,
  FileCheck2,
  ClipboardList,
  BookOpen,
  GraduationCap,
  MessageCircleHeart,
  Trophy,
  Check,
} from "lucide-react";

import ChatBubble from "./ChatBubble";

const journeySteps = [
  {
    icon: Target,
    label: "Goal Selected",
    detail: "Scholarship for undergraduate studies",
  },
  {
    icon: Compass,
    label: "Scholarships Found",
    detail: "12 matches from 4 sources",
  },
  {
    icon: ShieldCheck,
    label: "Eligibility Verified",
    detail: "You qualify for 9 of 12",
  },
  {
    icon: FileCheck2,
    label: "Documents Ready",
    detail: "6 of 7 uploaded",
  },
  {
    icon: ClipboardList,
    label: "Application Submitted",
    detail: "3 applications sent",
  },
  {
    icon: BookOpen,
    label: "Preparation Started",
    detail: "Adaptive plan · 42 days",
  },
  {
    icon: GraduationCap,
    label: "Mock Test",
    detail: "Score: 78% · +6% this week",
  },
  {
    icon: MessageCircleHeart,
    label: "Interview Ready",
    detail: "Coaching session complete",
  },
  {
    icon: Trophy,
    label: "Congratulations",
    detail: "Scholarship secured",
  },
];

export default function JourneyInterface() {
  const [active, setActive] = useState(3);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Ananya";
  const firstName = userName.split(" ")[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) =>
        prev >= journeySteps.length - 1 ? 3 : prev + 1
      );
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="surface-card overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-b from-surface to-muted/40 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <div className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
          saathi.app / your-journey
        </div>

        <div className="w-12" />
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Left Side */}
        <div className="border-r border-border bg-gradient-to-b from-[var(--sky-soft)]/60 to-transparent p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <h4 className="text-sm font-semibold">
                Saathi
              </h4>

              <p className="text-xs text-muted-foreground">
                Your companion · online
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <ChatBubble>
              Hi {firstName} — you're <b>82% ready</b> for
              the NSP application.
            </ChatBubble>

            <ChatBubble tone="mint">
              I found <b>12 scholarships</b> matching
              your profile.
            </ChatBubble>

            <ChatBubble tone="gold">
              Your income certificate expires next
              month.
            </ChatBubble>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2">
            <MessageCircleHeart className="h-4 w-4 text-primary" />

            <span className="text-sm text-muted-foreground">
              Ask Saathi anything...
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-eyebrow">
                Live journey
              </p>

              <h3 className="mt-1 text-xl font-semibold">
                {firstName}'s path to scholarship
              </h3>
            </div>

            <div className="text-right text-sm text-muted-foreground">
              Progress{" "}
              <span className="font-semibold text-foreground">
                {Math.round(
                  ((active + 1) /
                    journeySteps.length) *
                    100
                )}
                %
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              animate={{
                width: `${
                  ((active + 1) /
                    journeySteps.length) *
                  100
                }%`,
              }}
              transition={{
                duration: 0.6,
              }}
            />
          </div>

          <ol className="mt-6 space-y-3">
            {journeySteps.map((step, index) => {
              const state =
                index < active
                  ? "done"
                  : index === active
                  ? "active"
                  : "todo";

              const Icon = step.icon;

              return (
                <motion.li
                  layout
                  key={step.label}
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition-all ${
                    state === "active"
                      ? "border-primary bg-[var(--sky-soft)]"
                      : state === "done"
                      ? "border-border bg-surface"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      state === "done"
                        ? "bg-secondary/10 text-secondary"
                        : state === "active"
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {state === "done" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </span>

                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {step.label}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>

                  {state === "active" && (
                    <motion.span
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      className="hidden text-xs font-semibold text-primary md:block"
                    >
                      In Progress
                    </motion.span>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

