"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Save, Check, Loader2, AlertCircle } from "lucide-react";

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
  const { data: session, update: updateSession } = useSession();

  const [tab, setTab] = useState<Tab>("Profile");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("English + हिंदी");

  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync session and fetch existing profile data
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setUserImage(session.user.image || null);
    }

    async function loadProfile() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success) {
          if (data.user?.name) setName(data.user.name);
          if (data.user?.email) setEmail(data.user.email);
          if (data.user?.image) setUserImage(data.user.image);

          if (data.profile) {
            if (data.profile.phone) setPhone(data.profile.phone);
            if (data.profile.institutionName) setSchool(data.profile.institutionName);
            if (data.profile.state) setState(data.profile.state);
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [session]);

  const avatarLetter = (name || session?.user?.name || "A").charAt(0).toUpperCase();

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          school,
          state,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSaveStatus("success");
        // Update session if name changed
        if (session && name !== session.user?.name) {
          await updateSession({ name });
        }
        setTimeout(() => setSaveStatus("idle"), 4000);
      } else {
        setSaveStatus("error");
        setErrorMessage(data.message || "Failed to save profile.");
      }
    } catch (err) {
      console.error("Save profile error", err);
      setSaveStatus("error");
      setErrorMessage("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

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
                  ? "bg-primary/10 text-primary font-semibold"
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
              <form onSubmit={handleSaveProfile}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <SectionTitle title="Your details" />

                  {/* Header Action Button */}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all disabled:opacity-60 shadow-sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveStatus === "success" ? (
                      <>
                        <Check className="h-4 w-4 text-green-300" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>

                {/* Status Banners */}
                {saveStatus === "success" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Your profile details have been saved successfully.</span>
                  </div>
                )}

                {saveStatus === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage || "Error saving profile. Please try again."}</span>
                  </div>
                )}

                {/* Avatar */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-primary-foreground">
                    {userImage ? (
                      <img src={userImage} alt={name || "User"} className="h-full w-full object-cover" />
                    ) : (
                      avatarLetter
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {name || "User Profile"}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {school ? `${school} · ${state || "India"}` : "Student Profile"}
                    </div>

                    <button type="button" className="mt-2 text-xs font-semibold text-primary">
                      Change photo
                    </button>
                  </div>
                </div>

                {/* Editable Form Fields Grid */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Full name
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Email
                    </span>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="mt-1 w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground outline-none cursor-not-allowed"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Phone
                    </span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      School / Institution
                    </span>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g. Kendriya Vidyalaya No. 1"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      State
                    </span>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Madhya Pradesh"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Language
                    </span>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-8 flex items-center justify-end border-t border-border pt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-all disabled:opacity-60 shadow-sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveStatus === "success" ? (
                      <>
                        <Check className="h-4 w-4 text-green-300" />
                        Saved Successfully!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
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