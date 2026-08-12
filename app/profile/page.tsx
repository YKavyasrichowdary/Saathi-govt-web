"use client";

import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  AlertCircle,
  Check,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Card, SectionTitle } from "@/components/PageBits";

const TABS = [
  "Profile",
  "Preferences",
  "Privacy",
  "Account",
] as const;

type Tab = (typeof TABS)[number];

type Skill = {
  name: string;
  level: string;
};

type ProfileData = {
  phone?: string | null;
  gender?: string | null;
  dateOfBirth?: string | Date | null;
  educationLevel?: string | null;
  institutionName?: string | null;
  university?: string | null;
  course?: string | null;
  specialization?: string | null;
  currentSemester?: string | null;
  graduationYear?: number | null;
  cgpa?: number | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  bio?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  resumeId?: string | null;
  skills?: {
    id?: string;
    name: string;
    level?: string | null;
  }[];
  interests?: {
    id?: string;
    name: string;
  }[];
  careerGoals?: {
    id?: string;
    title: string;
  }[];
};

const inputClass =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10";

const labelClass =
  "text-xs font-semibold text-muted-foreground";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-7 first:border-t-0 first:pt-0">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, update: updateSession } =
    useSession();

  const [tab, setTab] = useState<Tab>("Profile");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [bio, setBio] = useState("");

  const [educationLevel, setEducationLevel] =
    useState("");
  const [institutionName, setInstitutionName] =
    useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [currentSemester, setCurrentSemester] =
    useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [cgpa, setCgpa] = useState("");

  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] =
    useState("Intermediate");

  const [interests, setInterests] = useState<string[]>(
    []
  );
  const [newInterest, setNewInterest] = useState("");

  const [careerGoals, setCareerGoals] =
    useState<string[]>([]);
  const [newCareerGoal, setNewCareerGoal] =
    useState("");

  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] =
    useState("");

  const [resumeId, setResumeId] = useState<
    string | null
  >(null);

  const [language, setLanguage] =
    useState("English + हिंदी");

  const [userImage, setUserImage] = useState<
    string | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setUserImage(session.user.image || null);
    }
  }, [session]);

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);

        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load profile."
          );
        }

        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setUserImage(data.user.image || null);
        }

        const profile: ProfileData | null =
          data.profile;

        if (!profile) {
          return;
        }

        setPhone(profile.phone || "");
        setGender(profile.gender || "");

        if (profile.dateOfBirth) {
          const date = new Date(
            profile.dateOfBirth
          );

          if (!Number.isNaN(date.getTime())) {
            setDateOfBirth(
              date.toISOString().split("T")[0]
            );
          }
        }

        setCity(profile.city || "");
        setState(profile.state || "");
        setCountry(profile.country || "India");
        setBio(profile.bio || "");

        setEducationLevel(
          profile.educationLevel || ""
        );
        setInstitutionName(
          profile.institutionName || ""
        );
        setUniversity(profile.university || "");
        setCourse(profile.course || "");
        setSpecialization(
          profile.specialization || ""
        );
        setCurrentSemester(
          profile.currentSemester || ""
        );

        setGraduationYear(
          profile.graduationYear
            ? String(profile.graduationYear)
            : ""
        );

        setCgpa(
          profile.cgpa !== null &&
            profile.cgpa !== undefined
            ? String(profile.cgpa)
            : ""
        );

        setSkills(
          (profile.skills || []).map((skill) => ({
            name: skill.name,
            level:
              skill.level || "Intermediate",
          }))
        );

        setInterests(
          (profile.interests || []).map(
            (interest) => interest.name
          )
        );

        setCareerGoals(
          (profile.careerGoals || []).map(
            (goal) => goal.title
          )
        );

        setLinkedinUrl(
          profile.linkedinUrl || ""
        );
        setGithubUrl(profile.githubUrl || "");
        setPortfolioUrl(
          profile.portfolioUrl || ""
        );

        setResumeId(profile.resumeId || null);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load profile."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const avatarLetter = (
    name ||
    session?.user?.name ||
    "A"
  )
    .charAt(0)
    .toUpperCase();

  const profileCompletion = useMemo(() => {
    let completed = 0;
    const total = 11;

    if (name.trim()) completed++;
    if (phone.trim()) completed++;
    if (educationLevel.trim()) completed++;
    if (course.trim()) completed++;
    if (specialization.trim()) completed++;
    if (cgpa.trim()) completed++;
    if (skills.length > 0) completed++;
    if (interests.length > 0) completed++;
    if (careerGoals.length > 0) completed++;
    if (resumeId) completed++;
    if (city.trim() && state.trim()) completed++;

    return Math.round(
      (completed / total) * 100
    );
  }, [
    name,
    phone,
    educationLevel,
    course,
    specialization,
    cgpa,
    skills,
    interests,
    careerGoals,
    resumeId,
    city,
    state,
  ]);

  function addSkill() {
    const value = newSkill.trim();

    if (!value) return;

    const exists = skills.some(
      (skill) =>
        skill.name.toLowerCase() ===
        value.toLowerCase()
    );

    if (exists) {
      setNewSkill("");
      return;
    }

    setSkills((current) => [
      ...current,
      {
        name: value,
        level: newSkillLevel,
      },
    ]);

    setNewSkill("");
  }

  function removeSkill(index: number) {
    setSkills((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function addInterest() {
    const value = newInterest.trim();

    if (!value) return;

    const exists = interests.some(
      (interest) =>
        interest.toLowerCase() ===
        value.toLowerCase()
    );

    if (!exists) {
      setInterests((current) => [
        ...current,
        value,
      ]);
    }

    setNewInterest("");
  }

  function removeInterest(index: number) {
    setInterests((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function addCareerGoal() {
    const value = newCareerGoal.trim();

    if (!value) return;

    const exists = careerGoals.some(
      (goal) =>
        goal.toLowerCase() ===
        value.toLowerCase()
    );

    if (!exists) {
      setCareerGoals((current) => [
        ...current,
        value,
      ]);
    }

    setNewCareerGoal("");
  }

  function removeCareerGoal(index: number) {
    setCareerGoals((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  async function handleSaveProfile(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (isSaving) return;

    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          gender: gender || undefined,
          dateOfBirth:
            dateOfBirth || undefined,

          educationLevel:
            educationLevel || undefined,

          institutionName:
            institutionName || undefined,

          university:
            university || undefined,

          course: course || undefined,

          specialization:
            specialization || undefined,

          currentSemester:
            currentSemester || undefined,

          graduationYear:
            graduationYear
              ? Number(graduationYear)
              : undefined,

          cgpa: cgpa
            ? Number(cgpa)
            : undefined,

          city: city || undefined,
          state: state || undefined,
          country: country || undefined,
          bio: bio || undefined,

          linkedinUrl:
            linkedinUrl || undefined,

          githubUrl:
            githubUrl || undefined,

          portfolioUrl:
            portfolioUrl || undefined,

          skills,
          interests,
          careerGoals,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save profile."
        );
      }

      if (session && name !== session.user?.name) {
        await updateSession({ name });
      }

      setSaveStatus("success");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 4000);
    } catch (error) {
      console.error(
        "Save profile error:",
        error
      );

      setSaveStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <AppShell
        title="Profile & Settings"
        subtitle="This is your space. You control what SAATHI knows."
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

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
              type="button"
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

        <div className="space-y-6">
          {tab === "Profile" && (
            <form onSubmit={handleSaveProfile}>
              <Card>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <SectionTitle title="Your details" />

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

                {/* Status */}
                {saveStatus === "success" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                    <Check className="h-4 w-4 shrink-0" />
                    Profile saved successfully.
                  </div>
                )}

                {saveStatus === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>
                      {errorMessage ||
                        "Error saving profile."}
                    </span>
                  </div>
                )}

                {/* Identity */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-primary-foreground">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      avatarLetter
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {name || "Student Profile"}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {institutionName
                        ? `${institutionName} · ${
                            state || "India"
                          }`
                        : "Complete your student profile"}
                    </div>
                  </div>
                </div>

                {/* Profile Strength */}
                <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Profile Strength
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Complete your profile to improve opportunity matching.
                      </p>
                    </div>

                    <span className="text-xl font-bold text-primary">
                      {profileCompletion}%
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${profileCompletion}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-8">
                  {/* Personal */}
                  <Section
                    title="Personal Information"
                    description="Basic information Saathi uses to understand you."
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Full name">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          className={inputClass}
                          placeholder="Your full name"
                        />
                      </Field>

                      <Field label="Email">
                        <input
                          type="email"
                          value={email}
                          disabled
                          className={`${inputClass} cursor-not-allowed bg-muted/40 text-muted-foreground`}
                        />
                      </Field>

                      <Field label="Phone">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                          className={inputClass}
                          placeholder="+91 9876543210"
                        />
                      </Field>

                      <Field label="Date of birth">
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) =>
                            setDateOfBirth(
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Gender">
                        <input
                          type="text"
                          value={gender}
                          onChange={(e) =>
                            setGender(e.target.value)
                          }
                          className={inputClass}
                          placeholder="e.g. Female"
                        />
                      </Field>

                      <Field label="City">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) =>
                            setCity(e.target.value)
                          }
                          className={inputClass}
                          placeholder="e.g. Hyderabad"
                        />
                      </Field>

                      <Field label="State">
                        <input
                          type="text"
                          value={state}
                          onChange={(e) =>
                            setState(e.target.value)
                          }
                          className={inputClass}
                          placeholder="e.g. Telangana"
                        />
                      </Field>

                      <Field label="Country">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) =>
                            setCountry(e.target.value)
                          }
                          className={inputClass}
                          placeholder="e.g. India"
                        />
                      </Field>

                      <div className="md:col-span-2">
                        <Field label="Bio">
                          <textarea
                            value={bio}
                            onChange={(e) =>
                              setBio(e.target.value)
                            }
                            rows={4}
                            className={`${inputClass} resize-none`}
                            placeholder="Tell Saathi a little about yourself, your interests, or what you're working towards."
                          />
                        </Field>
                      </div>
                    </div>
                  </Section>

                  {/* Education */}
                  <Section
                    title="Education"
                    description="This information is important for scholarship, internship, exam and opportunity eligibility."
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Education level">
                        <input
                          type="text"
                          value={educationLevel}
                          onChange={(e) =>
                            setEducationLevel(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. Undergraduate"
                        />
                      </Field>

                      <Field label="Institution">
                        <input
                          type="text"
                          value={institutionName}
                          onChange={(e) =>
                            setInstitutionName(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Your college / institution"
                        />
                      </Field>

                      <Field label="University">
                        <input
                          type="text"
                          value={university}
                          onChange={(e) =>
                            setUniversity(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. JNTUH"
                        />
                      </Field>

                      <Field label="Course / Degree">
                        <input
                          type="text"
                          value={course}
                          onChange={(e) =>
                            setCourse(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. B.Tech"
                        />
                      </Field>

                      <Field label="Specialization">
                        <input
                          type="text"
                          value={specialization}
                          onChange={(e) =>
                            setSpecialization(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. Data Science"
                        />
                      </Field>

                      <Field label="Current semester">
                        <input
                          type="text"
                          value={currentSemester}
                          onChange={(e) =>
                            setCurrentSemester(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. 6th"
                        />
                      </Field>

                      <Field label="Graduation year">
                        <input
                          type="number"
                          value={graduationYear}
                          onChange={(e) =>
                            setGraduationYear(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="e.g. 2027"
                        />
                      </Field>

                      <Field label="CGPA">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.01"
                          value={cgpa}
                          onChange={(e) =>
                            setCgpa(e.target.value)
                          }
                          className={inputClass}
                          placeholder="e.g. 8.25"
                        />
                      </Field>
                    </div>
                  </Section>

                  {/* Skills */}
                  <Section
                    title="Skills"
                    description="Add technical and professional skills so Saathi can match you with relevant opportunities."
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) =>
                          setNewSkill(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        className={inputClass}
                        placeholder="e.g. Python"
                      />

                      <select
                        value={newSkillLevel}
                        onChange={(e) =>
                          setNewSkillLevel(
                            e.target.value
                          )
                        }
                        className={`${inputClass} sm:w-44`}
                      >
                        <option>
                          Beginner
                        </option>
                        <option>
                          Intermediate
                        </option>
                        <option>
                          Advanced
                        </option>
                      </select>

                      <button
                        type="button"
                        onClick={addSkill}
                        className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2.5 text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {skills.map(
                        (skill, index) => (
                          <div
                            key={`${skill.name}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-2 text-sm"
                          >
                            <span className="font-medium">
                              {skill.name}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {skill.level}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removeSkill(index)
                              }
                              className="text-muted-foreground transition hover:text-destructive"
                              aria-label={`Remove ${skill.name}`}
                            >
                              ×
                            </button>
                          </div>
                        )
                      )}

                      {!skills.length && (
                        <p className="text-xs text-muted-foreground">
                          No skills added yet.
                        </p>
                      )}
                    </div>
                  </Section>

                  {/* Interests */}
                  <Section
                    title="Interests"
                    description="What areas do you genuinely want to explore?"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) =>
                          setNewInterest(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addInterest();
                          }
                        }}
                        className={inputClass}
                        placeholder="e.g. Artificial Intelligence"
                      />

                      <button
                        type="button"
                        onClick={addInterest}
                        className="btn-primary inline-flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {interests.map(
                        (interest, index) => (
                          <div
                            key={`${interest}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary"
                          >
                            {interest}

                            <button
                              type="button"
                              onClick={() =>
                                removeInterest(index)
                              }
                              className="hover:text-destructive"
                            >
                              ×
                            </button>
                          </div>
                        )
                      )}

                      {!interests.length && (
                        <p className="text-xs text-muted-foreground">
                          No interests added yet.
                        </p>
                      )}
                    </div>
                  </Section>

                  {/* Career Goals */}
                  <Section
                    title="Career Goals"
                    description="Tell Saathi what kind of career you're working towards."
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCareerGoal}
                        onChange={(e) =>
                          setNewCareerGoal(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCareerGoal();
                          }
                        }}
                        className={inputClass}
                        placeholder="e.g. Data Analyst"
                      />

                      <button
                        type="button"
                        onClick={addCareerGoal}
                        className="btn-primary inline-flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      {careerGoals.map(
                        (goal, index) => (
                          <div
                            key={`${goal}-${index}`}
                            className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm"
                          >
                            <span className="font-medium">
                              {goal}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removeCareerGoal(index)
                              }
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )
                      )}

                      {!careerGoals.length && (
                        <p className="text-xs text-muted-foreground">
                          No career goals added yet.
                        </p>
                      )}
                    </div>
                  </Section>

                  {/* Online Presence */}
                  <Section
                    title="Online Presence"
                    description="Optional, but useful for jobs, internships and professional opportunities."
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="LinkedIn">
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) =>
                            setLinkedinUrl(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="https://linkedin.com/in/..."
                        />
                      </Field>

                      <Field label="GitHub">
                        <input
                          type="url"
                          value={githubUrl}
                          onChange={(e) =>
                            setGithubUrl(
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="https://github.com/..."
                        />
                      </Field>

                      <div className="md:col-span-2">
                        <Field label="Portfolio">
                          <input
                            type="url"
                            value={portfolioUrl}
                            onChange={(e) =>
                              setPortfolioUrl(
                                e.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="https://yourportfolio.com"
                          />
                        </Field>
                      </div>
                    </div>
                  </Section>

                  {/* Resume */}
                  <Section
                    title="Primary Resume"
                    description="Your primary resume is managed through Documents."
                  >
                    {resumeId ? (
                      <div className="flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Primary resume selected
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Your resume can be analyzed and used for career recommendations.
                          </p>
                        </div>

                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-4">
                        <p className="text-sm font-semibold text-foreground">
                          No primary resume selected
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Select a primary resume from Documents to improve resume-aware recommendations.
                        </p>
                      </div>
                    )}
                  </Section>
                </div>

                {/* Bottom save */}
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
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </Card>
            </form>
          )}

          {tab === "Preferences" && (
            <Card>
              <SectionTitle title="How SAATHI works for you" />

              <div className="space-y-1">
                <div className="flex items-center justify-between border-b border-border py-4">
                  <div>
                    <div className="text-sm font-semibold">
                      Language of guidance
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language}
                    </div>
                  </div>

                  <input
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="w-44 rounded-lg border border-border bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>

                {[
                  [
                    "Study time reminder",
                    "Daily at 6:00 AM",
                  ],
                  [
                    "Weekly reflection",
                    "Every Sunday, 7:00 PM",
                  ],
                  [
                    "Motivation style",
                    "Gentle · never pushy",
                  ],
                  [
                    "Show me content in",
                    "Text · with optional audio",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-border py-4 last:border-b-0"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {label}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {value}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-xs font-semibold text-primary"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "Privacy" && (
            <Card>
              <SectionTitle title="Your data, your rules" />

              <p className="text-sm text-muted-foreground">
                SAATHI never sells your data. Your
                documents are encrypted. You can
                export or delete everything at any
                time.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-ghost"
                >
                  Download my data
                </button>

                <button
                  type="button"
                  className="btn-ghost"
                >
                  Manage consent
                </button>

                <button
                  type="button"
                  className="btn-ghost text-destructive"
                >
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
                      Manage your account password
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary"
                  >
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

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary"
                  >
                    Enable
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      callbackUrl:
                        "/auth/signin",
                    })
                  }
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