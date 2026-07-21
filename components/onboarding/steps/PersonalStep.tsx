"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Personal Information
        </h1>

        <p className="text-muted-foreground mt-2">
          Tell us a little about yourself.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <Label>Phone Number</Label>
          <Input
            placeholder="+91 9876543210"
            {...register("phone")}
          />
        </div>

        <div>
          <Label>City</Label>
          <Input
            placeholder="Hyderabad"
            {...register("city")}
          />
        </div>

        <div>
          <Label>State</Label>
          <Input
            placeholder="Telangana"
            {...register("state")}
          />
        </div>

        <div>
          <Label>Country</Label>
          <Input
            placeholder="India"
            {...register("country")}
          />
        </div>

      </div>

      <div>

        <Label>Bio</Label>

        <Textarea
          rows={5}
          placeholder="Tell us about yourself..."
          {...register("bio")}
        />

      </div>

    </div>
  );
}