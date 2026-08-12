"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  FileText,
  Target,
  Sparkles,
} from "lucide-react";

interface MissionHeroProps {
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  reward: string;
  matchIncrease?: string;
  dueText: string;
}

export default function MissionHero({
  title,
  description,
  progress,
  estimatedTime,
  reward,
  matchIncrease,
  dueText,
}: MissionHeroProps) {
  const continueHref = title.toLowerCase().includes("resume")
    ? "/documents"
    : title.toLowerCase().includes("profile")
    ? "/profile"
    : title.toLowerCase().includes("opportunity")
    ? "/opportunities"
    : "/roadmap";
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-primary/10
        bg-gradient-to-br
        from-indigo-50
        via-background
        to-amber-50
        dark:from-indigo-950/30
        dark:via-background
        dark:to-amber-900/20
        p-8
      "
    >
      {/* Decorative Glow */}
      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.3fr_320px]">

        {/* LEFT */}
        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            This Week
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
            {description}
          </p>

          {/* Status Chips */}

          <div className="mt-8 flex flex-wrap gap-3">

            <div className="rounded-xl border bg-background/70 px-4 py-3">
              <div className="text-xs text-muted-foreground">
                Resume Score
              </div>

              <div className="mt-1 text-xl font-bold">
                {progress}%
              </div>
            </div>

            <div className="rounded-xl border bg-background/70 px-4 py-3">
              <div className="text-xs text-muted-foreground">
                Estimated Time
              </div>

              <div className="mt-1 flex items-center gap-2 font-semibold">
                <Clock3 className="h-4 w-4 text-primary" />
                {estimatedTime}
              </div>
            </div>

            <div className="rounded-xl border bg-background/70 px-4 py-3">
              <div className="text-xs text-muted-foreground">
                Due
              </div>

              <div className="mt-1 font-semibold">
                {dueText}
              </div>
            </div>

          </div>

          {/* Reward */}

          <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              Mission Reward
            </p>

            <div className="mt-2 flex flex-wrap gap-3">

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {reward}
              </span>

              {matchIncrease && (
                <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {matchIncrease}
                </span>
              )}

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/roadmap"
              className="btn-primary flex items-center gap-2 px-6 py-3"
            >
              View Journey
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="flex items-center justify-center"
        >

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border bg-background/60 backdrop-blur">

              <Target className="h-24 w-24 text-primary" />

            </div>

            <div className="absolute -left-2 top-10 rounded-full bg-background p-3 shadow-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div className="absolute -right-3 bottom-10 rounded-full bg-background p-3 shadow-lg">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>

          </div>

        </motion.div>

      </div>

    </motion.section>
  );
}