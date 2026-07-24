"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EducationStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Education
        </h2>

        <p className="text-muted-foreground mt-2">
          Tell us about your academic journey.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Education Level */}

        <div className="space-y-2">

          <Label>Education Level</Label>

          <Controller
            control={control}
            name="educationLevel"
            render={({ field }) => (
              <Select
                value={field.value}
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
            <p className="text-sm text-red-500">
              {String(errors.educationLevel.message)}
            </p>
          )}

        </div>

        {/* Institution */}

        <div className="space-y-2">

          <Label>Institution Name</Label>

          <Input
            placeholder="CMR College of Engineering & Technology"
            {...register("institutionName")}
          />

        </div>

        {/* University */}

        <div className="space-y-2">

          <Label>University / Board</Label>

          <Input
            placeholder="JNTUH"
            {...register("university")}
          />

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
            placeholder="Data Science"
            {...register("specialization")}
          />

        </div>

        {/* Current Semester */}

        <div className="space-y-2">

          <Label>Current Semester / Year</Label>

          <Input
            placeholder="7th Semester"
            {...register("currentSemester")}
          />

        </div>

        {/* Graduation Year */}

        <div className="space-y-2">

          <Label>Graduation Year</Label>

          <Input
            type="number"
            placeholder="2027"
            {...register("graduationYear", {
              valueAsNumber: true,
            })}
          />

        </div>

        {/* CGPA */}

        <div className="space-y-2">

          <Label>CGPA / Percentage</Label>

          <Input
            type="number"
            step="0.01"
            placeholder="8.75"
            {...register("cgpa", {
              valueAsNumber: true,
            })}
          />

        </div>

      </div>

    </div>
  );
}