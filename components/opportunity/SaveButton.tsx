"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

interface Props {
  opportunityId: string;
  initialSaved?: boolean;
}

export default function SaveButton({
  opportunityId,
  initialSaved = false,
}: Props) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  async function toggleSave() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/opportunities/save", {
        method: saved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunityId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update bookmark.");
      }

      setSaved(!saved);

      toast.success(
        saved
          ? "Removed from saved opportunities."
          : "Opportunity saved."
      );

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSave();
      }}
      disabled={loading}
      suppressHydrationWarning
      className="rounded-full p-2 transition hover:bg-muted"
    >
      <Bookmark
        className={`h-5 w-5 transition ${
          saved
            ? "fill-primary text-primary"
            : "text-muted-foreground"
        }`}
      />
    </button>
  );
}