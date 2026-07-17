import type { Metadata } from "next";
import HelpClient from "./HelpClient";

export const metadata: Metadata = {
  title: "Help Center | SAATHI",
  description:
    "Guides, answers, and a human on the other side when you need one.",
};

export default function HelpPage() {
  return <HelpClient />;
}