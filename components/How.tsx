"use client";

import { motion } from "framer-motion";
import { Route as RouteIcon } from "lucide-react";

import Section from "./Section";
import Eyebrow from "./Eyebrow";

const howSteps = [
  {
    n: "01",
    title: "Choose a dream",
    body: "Tell Saathi what you're after — a scholarship, GATE, a placement, anything.",
  },
  {
    n: "02",
    title: "Get a roadmap",
    body: "A personalised path is drawn from your profile, timeline and strengths.",
  },
  {
    n: "03",
    title: "Find opportunities",
    body: "Saathi scans and shortlists everything relevant.",
  },
  {
    n: "04",
    title: "Track requirements",
    body: "Documents, deadlines and eligibility are organised for you.",
  },
  {
    n: "05",
    title: "Prepare together",
    body: "Study plans, materials and mock tests tailored for you.",
  },
  {
    n: "06",
    title: "Stay on course",
    body: "Reminders, adaptive plans and celebration when you succeed.",
  },
];

export default function How() {
  return (
    <Section
      id="how"
      className="py-28 md:py-36"
    >
      <div className="max-w-2xl">
        <Eyebrow>
          How Saathi works
        </Eyebrow>

        <h2 className="text-display mt-4 text-[40px] md:text-[56px]">
          A quiet guide from{" "}
          <span className="text-primary">
            first step
          </span>{" "}
          to success.
        </h2>

        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          Not a dashboard. Not another tool.
          A companion that keeps context,
          keeps score and keeps you moving.
        </p>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {howSteps.map((step, index) => (
          <motion.div
            key={step.n}
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
            }}
            className="surface-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">
                {step.n}
              </span>

              <RouteIcon className="h-4 w-4 text-muted-foreground/60" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

