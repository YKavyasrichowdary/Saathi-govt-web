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

export default function BasicInformationSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="surface-card space-y-6 p-6">

      <div>

        <h2 className="text-xl font-semibold">
          Basic Information
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          General information about this opportunity.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Title */}

        <div className="space-y-2 md:col-span-2">

          <Label>Title</Label>

          <Input
            placeholder="Smart India Hackathon 2027"
            {...register("title")}
          />

          {errors.title && (
            <p className="text-sm text-destructive">
              {String(errors.title.message)}
            </p>
          )}

        </div>

        {/* Organization */}

        <div className="space-y-2">

          <Label>Organization</Label>

          <Input
            placeholder="AICTE"
            {...register("organization")}
          />

        </div>

        {/* Source */}

        <div className="space-y-2">

          <Label>Source</Label>

          <Controller
            control={control}
            name="source"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="GOVERNMENT">
                    Government
                  </SelectItem>

                  <SelectItem value="PRIVATE">
                    Private
                  </SelectItem>

                  <SelectItem value="UNIVERSITY">
                    University
                  </SelectItem>

                  <SelectItem value="COMPANY">
                    Company
                  </SelectItem>

                  <SelectItem value="NGO">
                    NGO
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

        </div>

        {/* Type */}

        <div className="space-y-2">

          <Label>Opportunity Type</Label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="SCHOLARSHIP">
                    Scholarship
                  </SelectItem>

                  <SelectItem value="HACKATHON">
                    Hackathon
                  </SelectItem>

                  <SelectItem value="INTERNSHIP">
                    Internship
                  </SelectItem>

                  <SelectItem value="JOB">
                    Job
                  </SelectItem>

                  <SelectItem value="COURSE">
                    Course
                  </SelectItem>

                  <SelectItem value="EVENT">
                    Event
                  </SelectItem>

                  <SelectItem value="COMPETITION">
                    Competition
                  </SelectItem>

                  <SelectItem value="FELLOWSHIP">
                    Fellowship
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

        </div>

        {/* Mode */}

        <div className="space-y-2">

          <Label>Mode</Label>

          <Controller
            control={control}
            name="mode"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="ONLINE">
                    Online
                  </SelectItem>

                  <SelectItem value="OFFLINE">
                    Offline
                  </SelectItem>

                  <SelectItem value="HYBRID">
                    Hybrid
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

        </div>

        {/* Status */}

        <div className="space-y-2">

          <Label>Status</Label>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="DRAFT">
                    Draft
                  </SelectItem>

                  <SelectItem value="OPEN">
                    Open
                  </SelectItem>

                  <SelectItem value="UPCOMING">
                    Upcoming
                  </SelectItem>

                  <SelectItem value="CLOSED">
                    Closed
                  </SelectItem>

                  <SelectItem value="EXPIRED">
                    Expired
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

        </div>

        {/* Amount */}

        <div className="space-y-2">

          <Label>Reward / Amount</Label>

          <Input
            placeholder="₹1,00,000"
            {...register("amount")}
          />

        </div>

        {/* Location */}

        <div className="space-y-2">

          <Label>Location</Label>

          <Input
            placeholder="Hyderabad"
            {...register("location")}
          />

        </div>

        {/* State */}

        <div className="space-y-2">

          <Label>State</Label>

          <Input
            placeholder="Telangana"
            {...register("state")}
          />

        </div>

        {/* City */}

        <div className="space-y-2">

          <Label>City</Label>

          <Input
            placeholder="Hyderabad"
            {...register("city")}
          />

        </div>

        {/* Registration Link */}

        <div className="space-y-2 md:col-span-2">

          <Label>Registration Link</Label>

          <Input
            placeholder="https://..."
            {...register("registrationLink")}
          />

        </div>

        {/* Image */}

        <div className="space-y-2">

          <Label>Image URL</Label>

          <Input
            placeholder="https://..."
            {...register("imageUrl")}
          />

        </div>

        {/* Banner */}

        <div className="space-y-2">

          <Label>Banner URL</Label>

          <Input
            placeholder="https://..."
            {...register("bannerUrl")}
          />

        </div>

        {/* Description */}

        <div className="space-y-2 md:col-span-2">

          <Label>Description</Label>

          <Textarea
            rows={8}
            placeholder="Describe the opportunity..."
            {...register("description")}
          />

        </div>

      </div>

    </section>
  );
}