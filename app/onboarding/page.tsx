import type { Metadata } from "next";
import OnboardingClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Get to know you | SAATHI",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}