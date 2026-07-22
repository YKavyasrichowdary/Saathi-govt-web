"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PublishingSection() {
  const { control } = useFormContext();

  return (
    <section className="surface-card space-y-6 p-6">

      <div>

        <h2 className="text-xl font-semibold">
          Publishing
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Control visibility of this opportunity.
        </p>

      </div>

      <div className="space-y-6">

        <Controller
          control={control}
          name="featured"
          render={({ field }) => (
            <div className="flex items-center justify-between rounded-xl border p-4">

              <div>

                <Label>Featured Opportunity</Label>

                <p className="text-sm text-muted-foreground">
                  Show this on the dashboard.
                </p>

              </div>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />

            </div>
          )}
        />

        <Controller
          control={control}
          name="verified"
          render={({ field }) => (
            <div className="flex items-center justify-between rounded-xl border p-4">

              <div>

                <Label>Verified Opportunity</Label>

                <p className="text-sm text-muted-foreground">
                  Mark this opportunity as verified.
                </p>

              </div>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />

            </div>
          )}
        />

      </div>

    </section>
  );
}