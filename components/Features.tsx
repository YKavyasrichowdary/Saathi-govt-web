"use client";

import { motion } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  FileCheck2,
  ClipboardList,
  Route,
  BookOpen,
  GraduationCap,
  Target,
  Flame,
  MessageCircleHeart,
  Bell,
  CalendarClock,
  ChevronRight,
} from "lucide-react";

import Section from "./Section";
import Eyebrow from "./Eyebrow";

const features = [
  {
    icon: Compass,
    title: "Opportunity Discovery",
    body: "Every scholarship, exam and internship surfaced for you.",
  },
  {
    icon: ShieldCheck,
    title: "Eligibility Checker",
    body: "Instantly know where you're eligible.",
  },
  {
    icon: FileCheck2,
    title: "Document Verification",
    body: "Know what's missing before deadlines.",
  },
  {
    icon: ClipboardList,
    title: "Application Assistant",
    body: "Forms drafted, reviewed and submitted.",
  },
  {
    icon: Route,
    title: "Preparation Planner",
    body: "A roadmap built around your schedule.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    body: "Curated notes and previous papers.",
  },
  {
    icon: GraduationCap,
    title: "Mock Tests",
    body: "Realistic tests with performance tracking.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    body: "Know exactly how ready you are.",
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    body: "Build consistency every day.",
  },
  {
    icon: MessageCircleHeart,
    title: "AI Mentor",
    body: "A companion available whenever you need.",
  },
  {
    icon: Bell,
    title: "Reminders",
    body: "Never miss an important deadline.",
  },
  {
    icon: CalendarClock,
    title: "Adaptive Roadmaps",
    body: "Plans that change with your progress.",
  },
];

export default function Features() {
  return (
    <Section
      id="features"
      className="py-28 md:py-36"
    >
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
        <div>
          <Eyebrow>Features</Eyebrow>

          <h2 className="text-display mt-4 text-[40px] md:text-[56px]">
            Twelve capabilities.
            <br />
            One{" "}
            <span className="text-secondary">
              companion.
            </span>
          </h2>
        </div>

        <p className="text-[16.5px] leading-relaxed text-muted-foreground md:pb-2">
          Everything a serious student needs,
          working together instead of across
          dozens of different apps.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.06,
              }}
              className="group relative bg-surface p-7 transition-colors hover:bg-[var(--sky-soft)]/50"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--sky-soft)] to-white ring-1 ring-inset ring-border">
                <Icon className="h-5 w-5 text-primary" />
              </span>

              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>

              <ChevronRight className="absolute right-5 top-7 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

