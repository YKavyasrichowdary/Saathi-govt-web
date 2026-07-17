"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      label: "Journey",
      href: "#journey",
    },
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "How it Works",
      href: "#how",
    },
    {
      label: "About",
      href: "#about",
    },
  ];

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`flex w-full max-w-[1120px] items-center justify-between rounded-full border border-border/70 bg-surface/80 px-4 py-2.5 backdrop-blur-xl transition-shadow ${
          scrolled
            ? "shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]"
            : "shadow-[0_2px_10px_-5px_rgba(15,23,42,0.08)]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <Logo />
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/signin"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>

          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_oklch(0.55_0.2_262/0.6)] transition-transform hover:-translate-y-[1px]"
          >
            Get started

            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}