import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

import {
  FileCheck2,
  Upload,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documents & Eligibility · SAATHI",
  description:
    "Every certificate, upload and eligibility signal in one calm place.",
  robots: {
    index: false,
    follow: false,
  },
};

const DOCS = [
  {
    name: "Aadhaar Card",
    status: "verified",
    note: "Verified · 2 Sep 2025",
  },
  {
    name: "Income Certificate",
    status: "verified",
    note: "Valid until Mar 2027",
  },
  {
    name: "Class 10 Marksheet",
    status: "verified",
    note: "88% · CBSE",
  },
  {
    name: "Domicile Certificate",
    status: "missing",
    note: "Needed for 3 scholarships",
  },
  {
    name: "Caste Certificate",
    status: "pending",
    note: "Uploaded · under review",
  },
  {
    name: "Bank Passbook (first page)",
    status: "verified",
    note: "SBI · Verified",
  },
  {
    name: "Passport-size Photo",
    status: "verified",
    note: "Meets scholarship spec",
  },
  {
    name: "Class 12 Marksheet",
    status: "missing",
    note: "Will unlock June 2026",
  },
];

export default function DocumentsPage() {
  return (
    <AppShell
      title="Documents & Eligibility"
      subtitle="6 of 8 uploaded · 62 opportunities unlock when complete"
    >
      {/* Summary */}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="bg-mint-soft/50">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            <ShieldCheck className="h-4 w-4" />
            Verified
          </div>

          <div className="mt-2 text-3xl font-bold text-foreground">
            5
          </div>
        </Card>

        <Card className="bg-gold-soft/60">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground">
            <AlertCircle className="h-4 w-4" />
            Under review
          </div>

          <div className="mt-2 text-3xl font-bold text-foreground">
            1
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <Upload className="h-4 w-4" />
            To upload
          </div>

          <div className="mt-2 text-3xl font-bold text-foreground">
            2
          </div>
        </Card>
      </div>

      <SectionTitle
        eyebrow="Locker"
        title="Your documents"
      />

      <div className="grid gap-3 md:grid-cols-2">
        {DOCS.map((doc) => (
          <div
            key={doc.name}
            className="surface-card flex items-center gap-4 p-4"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                doc.status === "verified"
                  ? "bg-secondary/15 text-secondary"
                  : doc.status === "pending"
                  ? "bg-accent/25 text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <FileCheck2 className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">
                {doc.name}
              </div>

              <div className="text-xs text-muted-foreground">
                {doc.note}
              </div>
            </div>

            <button
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                doc.status === "missing"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {doc.status === "missing" ? (
                <>
                  <Upload className="h-3 w-3" />
                  Upload
                </>
              ) : (
                "View"
              )}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}