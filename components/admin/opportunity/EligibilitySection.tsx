"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EligibilitySection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="surface-card space-y-6 p-6">

      <div>

        <h2 className="text-xl font-semibold">
          Eligibility
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Define who is eligible for this opportunity.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Education Level */}

        <div className="space-y-2">

          <Label>Education Level</Label>

          <Controller
            control={control}
            name="educationLevel"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Education Level" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="SCHOOL">
                    School
                  </SelectItem>

                  <SelectItem value="INTERMEDIATE">
                    Intermediate
                  </SelectItem>

                  <SelectItem value="DIPLOMA">
                    Diploma
                  </SelectItem>

                  <SelectItem value="UNDERGRADUATE">
                    Undergraduate
                  </SelectItem>

                  <SelectItem value="POSTGRADUATE">
                    Postgraduate
                  </SelectItem>

                  <SelectItem value="DOCTORATE">
                    Doctorate
                  </SelectItem>

                  <SelectItem value="CERTIFICATION">
                    Certification
                  </SelectItem>

                  <SelectItem value="COMPETITIVE_EXAM">
                    Competitive Exam
                  </SelectItem>

                  <SelectItem value="OTHER">
                    Other
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

          {errors.educationLevel && (
            <p className="text-sm text-destructive">
              {String(errors.educationLevel.message)}
            </p>
          )}

        </div>

        {/* Course */}

        <div className="space-y-2">

          <Label>Course</Label>

          <Input
            placeholder="B.Tech"
            {...register("course")}
          />

        </div>

        {/* Specialization */}

        <div className="space-y-2">

          <Label>Specialization</Label>

          <Input
            placeholder="Computer Science"
            {...register("specialization")}
          />

        </div>

        {/* Minimum CGPA */}

        <div className="space-y-2">

          <Label>Minimum CGPA</Label>

          <Input
            type="number"
            step="0.01"
            placeholder="7.5"
            {...register("minCGPA", {
              valueAsNumber: true,
            })}
          />

        </div>

        {/* Eligibility */}

        <div className="space-y-2 md:col-span-2">

          <Label>Eligibility Criteria</Label>

          <Textarea
            rows={6}
            placeholder="Describe eligibility criteria..."
            {...register("eligibility")}
          />

        </div>

        {/* Benefits */}

        <div className="space-y-2 md:col-span-2">

          <Label>Benefits</Label>

          <Textarea
            rows={5}
            placeholder="Scholarship amount, certificates, internships..."
            {...register("benefits")}
          />

        </div>

        {/* Application Process */}

        <div className="space-y-2 md:col-span-2">

          <Label>Application Process</Label>

          <Textarea
            rows={6}
            placeholder="Explain how students can apply..."
            {...register("applicationProcess")}
          />

        </div>

      </div>

    </section>
  );
}