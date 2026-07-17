import Link from "next/link";

import Section from "./Section";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <Section className="flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-center">
        {/* Left */}
        <div>
          <Logo />

          <p className="mt-3 max-w-sm text-[13.5px] text-muted-foreground">
            Every dream deserves a companion.
            Built with care for students,
            everywhere.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13.5px] text-muted-foreground">
          <a
            href="#journey"
            className="transition-colors hover:text-foreground"
          >
            Journey
          </a>

          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="#about"
            className="transition-colors hover:text-foreground"
          >
            About
          </a>

          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
        </div>
      </Section>

      <div className="border-t border-border/60 py-5 text-center text-[12px] text-muted-foreground">
        © {new Date().getFullYear()} SAATHI.
        Made for every dream.
      </div>
    </footer>
  );
}
