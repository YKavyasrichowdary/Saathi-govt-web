"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="surface-card space-y-6 p-6">

      <div>

        <h2 className="text-xl font-semibold">
          Dates
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Configure important dates for this opportunity.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="space-y-2">

          <Label>Application Deadline</Label>

          <Input
            type="date"
            {...register("deadline")}
          />

          {errors.deadline && (
            <p className="text-sm text-destructive">
              {String(errors.deadline.message)}
            </p>
          )}

        </div>

        <div className="space-y-2">

          <Label>Start Date</Label>

          <Input
            type="date"
            {...register("startDate")}
          />

        </div>

        <div className="space-y-2">

          <Label>End Date</Label>

          <Input
            type="date"
            {...register("endDate")}
          />

        </div>

      </div>

    </section>
  );
}