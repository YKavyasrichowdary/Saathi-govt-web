"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  Check,
} from "lucide-react";

import Section from "./Section";
import JourneyInterface from "./JourneyInterface";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 80]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.4]
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      {/* Background */}

      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-90"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(180deg,transparent,transparent 40%,oklch(0.982 0.006 250) 100%),radial-gradient(1200px 400px at 50% -50px,oklch(0.55 0.2 262 / 0.18),transparent 60%)",
        }}
      />

      <Section className="relative">
        <motion.div
          style={{
            y,
            opacity,
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Your AI companion for every dream
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.05,
            }}
            className="text-display mt-8 text-[46px] leading-[1.02] md:text-[88px]"
          >
            Every Dream

            <br />

            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Deserves a Companion.
              </span>
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.15,
            }}
            className="mt-7 max-w-[640px] text-[17px] leading-relaxed text-muted-foreground md:text-[19px]"
          >
            Whether it's a scholarship, GATE,
            placement, government exam or internship —
            SAATHI walks with you from your very first
            step until you achieve your goal.
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.25,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/auth/signup"
              className="btn-primary group"
            >
              Start your journey

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <a
              href="#how"
              className="btn-ghost group"
            >
              <Play className="h-3.5 w-3.5 fill-current" />

              Watch demo
            </a>
          </motion.div>

          {/* Features */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.35,
            }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              Private by design
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-secondary" />
              Free to begin
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-secondary" />
              No credit card
            </span>
          </motion.div>
        </motion.div>

        {/* Journey Interface */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.9,
            ease: EASE,
          }}
          className="relative mx-auto mt-20 max-w-[1080px]"
        >
          <JourneyInterface />
        </motion.div>
      </Section>
    </div>
  );
}

