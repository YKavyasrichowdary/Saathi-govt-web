"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";

const stages = [
  {
    title: "Confused",
    body: "Dozens of tabs. Missed deadlines. Quiet doubt.",
    tone: "muted",
  },
  {
    title: "Guided",
    body: "A path appears. The next step is always obvious.",
    tone: "sky",
  },
  {
    title: "Prepared",
    body: "Consistent progress. Real readiness. Calm nerves.",
    tone: "mint",
  },
  {
    title: "Successful",
    body: "The dream, achieved — with a companion who stayed.",
    tone: "gold",
  },
];

export default function Transformation() {
  return (
    <Section
      id="journey"
      className="py-28 md:py-36"
    >
      <div className="max-w-2xl">
        <Eyebrow>
          The transformation
        </Eyebrow>

        <h2 className="text-display mt-4 text-[40px] md:text-[56px]">
          From confused to{" "}
          <span className="text-secondary">
            successful.
          </span>
        </h2>

        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          A student's journey told in four
          honest stages. Saathi walks every
          one of them with you.
        </p>
      </div>

      <div className="relative mt-16">

        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

        <div className="grid gap-6 md:grid-cols-4">
          {stages.map((stage, index) => {

            const bg =
              stage.tone === "sky"
                ? "bg-[var(--sky-soft)]"
                : stage.tone === "mint"
                ? "bg-[var(--mint-soft)]"
                : stage.tone === "gold"
                ? "bg-[var(--gold-soft)]"
                : "bg-muted";

            return (
              <motion.div
                key={stage.title}
                initial={{
                  opacity: 0,
                  y: 20,
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
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="relative"
              >
                <div
                  className={`mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-border ${bg} text-[22px] font-bold tracking-tight shadow-[0_10px_30px_-15px_oklch(0.15_0.04_260/0.15)]`}
                >
                  0{index + 1}
                </div>

                <div className="mt-6 text-center">

                  <h3 className="text-[20px] font-semibold tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[220px] text-[14px] leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
