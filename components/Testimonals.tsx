"use client";

import { motion } from "framer-motion";

import Section from "./Section";
import Eyebrow from "./Eyebrow";

const testimonials = [
  {
    quote:
      "I had eight tabs open every night trying to keep up with scholarships. Saathi turned that chaos into a single, honest plan.",
    name: "Ananya R.",
    role: "Undergraduate · Bengaluru",
    tone: "sky",
  },
  {
    quote:
      "It didn't just remind me—it adjusted my prep when I got sick. I felt like someone actually had my back.",
    name: "Rohit K.",
    role: "GATE Aspirant · Pune",
    tone: "mint",
  },
  {
    quote:
      "I didn't know I was eligible for half of what Saathi found. Two applications later, I got the offer.",
    name: "Meera S.",
    role: "MS Applicant · Hyderabad",
    tone: "gold",
  },
];

export default function Testimonials() {
  return (
    <Section
      id="about"
      className="py-28 md:py-36"
    >
      <div className="max-w-2xl">
        <Eyebrow>Voices</Eyebrow>

        <h2 className="text-display mt-4 text-[40px] md:text-[56px]">
          "I'm not alone anymore."
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const bg =
            testimonial.tone === "mint"
              ? "bg-[var(--mint-soft)]"
              : testimonial.tone === "gold"
              ? "bg-[var(--gold-soft)]"
              : "bg-[var(--sky-soft)]";

          return (
            <motion.figure
              key={testimonial.name}
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
              className={`surface-card flex h-full flex-col p-7 ${bg}`}
            >
              <div className="text-[28px] leading-none text-primary/70">
                "
              </div>

              <blockquote className="mt-2 flex-1 text-[16px] leading-relaxed text-foreground/85">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface font-semibold text-primary ring-1 ring-inset ring-border">
                  {testimonial.name.charAt(0)}
                </span>

                <div>
                  <div className="text-sm font-semibold">
                    {testimonial.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </Section>
  );
}

