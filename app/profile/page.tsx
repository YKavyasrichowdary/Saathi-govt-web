"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

const TABS = [
  "Profile",
  "Preferences",
  "Privacy",
  "Account",
] as const;

type Tab = (typeof TABS)[number];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.name || "Ananya Sharma";
  const userEmail = session?.user?.email || "ananya@example.com";
  const userImage = session?.user?.image || null;
  const avatarLetter = userName.charAt(0).toUpperCase();

  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <AppShell
      title="Profile & Settings"
      subtitle="This is your space. You control what SAATHI knows."
    >
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}

        <nav className="space-y-1">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                tab === item
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Content */}

        <div className="space-y-6">
          {tab === "Profile" && (
            <Card>
              <SectionTitle title="Your details" />

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-primary-foreground">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="h-full w-full object-cover" />
                  ) : (
                    avatarLetter
                  )}
                </div>

                <div>
                  <div className="text-lg font-bold text-foreground">
                    {userName}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Class 12 · Bhopal, MP · Preparing for JEE
                  </div>

                  <button className="mt-2 text-xs font-semibold text-primary">
                    Change photo
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Full name", userName],
                  ["Email", userEmail],
                  ["Phone", "+91 98xxxxxx21"],
                  ["School", "Kendriya Vidyalaya No. 1"],
                  ["State", "Madhya Pradesh"],
                  ["Language", "English + हिंदी"],
                ].map(([label, value]) => (
                  <label key={label} className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {label}
                    </span>

                    <input
                      key={value}
                      defaultValue={value}
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </label>
                ))}
              </div>
            </Card>
          )}

          {tab === "Preferences" && (
            <Card>
              <SectionTitle title="How SAATHI works for you" />

              {[
                ["Study time reminder", "Daily at 6:00 AM"],
                ["Weekly reflection", "Every Sunday, 7:00 PM"],
                ["Language of guidance", "Hindi + English"],
                ["Motivation style", "Gentle · never pushy"],
                ["Show me content in", "Text · with optional audio"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-border py-3 last:border-b-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {label}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {value}
                    </div>
                  </div>

                  <button className="text-xs font-semibold text-primary">
                    Edit
                  </button>
                </div>
              ))}
            </Card>
          )}

          {tab === "Privacy" && (
            <Card>
              <SectionTitle title="Your data, your rules" />

              <p className="text-sm text-muted-foreground">
                SAATHI never sells your data. Your documents are encrypted.
                You can export or delete everything at any time.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-ghost">
                  Download my data
                </button>

                <button className="btn-ghost">
                  Manage consent
                </button>

                <button className="btn-ghost text-destructive">
                  Delete my account
                </button>
              </div>
            </Card>
          )}

          {tab === "Account" && (
            <Card>
              <SectionTitle title="Sign in & security" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border py-3">
                  <div>
                    Password

                    <div className="text-xs text-muted-foreground">
                      Last changed 2 months ago
                    </div>
                  </div>

                  <button className="text-xs font-semibold text-primary">
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-border py-3">
                  <div>
                    Two-factor authentication

                    <div className="text-xs text-muted-foreground">
                      Recommended for extra safety
                    </div>
                  </div>

                  <button className="text-xs font-semibold text-primary">
                    Enable
                  </button>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Sign out
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}