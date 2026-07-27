"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  missionId: string;
}

export default function CompleteMissionButton({
  missionId,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function completeMission() {

    if (loading) return;

    setLoading(true);

    try {

      const res = await fetch(
        `/api/missions/${missionId}/complete`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      toast.success(
        "Mission completed!"
      );

      router.push("/dashboard");

      router.refresh();

    } catch (error: any) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <button
      onClick={completeMission}
      disabled={loading}
      className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
    >

      <CheckCircle2 className="h-5 w-5" />

      {loading
        ? "Completing..."
        : "Complete Mission"}

    </button>

  );
}