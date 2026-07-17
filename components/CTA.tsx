"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import Section from "./Section";

export default function CTA() {
  return (
    <Section
      id="cta"
      className="py-28 md:py-36"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-[var(--sky-soft)] via-white to-[var(--mint-soft)] px-8 py-20 text-center md:px-16 md:py-28">
        {/* Background Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(600px 200px at 50% 0%, oklch(0.55 0.2 262 / 0.12), transparent 70%)",
          }}
        />

        <motion.div
          className="relative"
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
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <span className="chip mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Every dream deserves a companion
          </span>

          <h2 className="text-display mx-auto mt-8 max-w-3xl text-[44px] leading-[1.05] md:text-[72px]">
            Your dream already exists.
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Now give it a companion.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground">
            Start today. Saathi will be there tomorrow,
            next month, and on the morning you succeed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="btn-primary"
            >
              Start your journey

              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#how"
              className="btn-ghost"
            >
              Learn how it works
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
