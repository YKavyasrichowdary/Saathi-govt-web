"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Personal Information
        </h2>

        <p className="text-muted-foreground mt-2">
          Tell us a little about yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Phone */}

        <div className="space-y-2">
          <Label>Phone Number</Label>

          <Input
            placeholder="+91 9876543210"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {String(errors.phone.message)}
            </p>
          )}
        </div>

        {/* Gender */}

        <div className="space-y-2">

          <Label>Gender</Label>

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>

                  <SelectValue placeholder="Select Gender" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="MALE">
                    Male
                  </SelectItem>

                  <SelectItem value="FEMALE">
                    Female
                  </SelectItem>

                  <SelectItem value="OTHER">
                    Other
                  </SelectItem>

                  <SelectItem value="PREFER_NOT_TO_SAY">
                    Prefer not to say
                  </SelectItem>

                </SelectContent>

              </Select>
            )}
          />

          {errors.gender && (
            <p className="text-sm text-red-500">
              {String(errors.gender.message)}
            </p>
          )}

        </div>

        {/* Date of Birth */}

        <div className="space-y-2">

          <Label>Date of Birth</Label>

          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Popover>

                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {field.value ? (
                        format(
                          new Date(field.value),
                          "PPP"
                        )
                      ) : (
                        "Pick a date"
                      )}
                    </Button>
                  }
                />

                <PopoverContent
                  className="w-auto p-0"
                >

                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? new Date(field.value)
                        : undefined
                    }
                    onSelect={(date) =>
                      field.onChange(
                        date?.toISOString()
                      )
                    }
                    captionLayout="dropdown"
                    startMonth={new Date(1950, 0)}
                    endMonth={new Date()}
                  />

                </PopoverContent>

              </Popover>
            )}
          />

          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">
              {String(errors.dateOfBirth.message)}
            </p>
          )}

        </div>

        {/* City */}

        <div className="space-y-2">

          <Label>City</Label>

          <Input
            placeholder="Hyderabad"
            {...register("city")}
          />

          {errors.city && (
            <p className="text-sm text-red-500">
              {String(errors.city.message)}
            </p>
          )}

        </div>

        {/* State */}

        <div className="space-y-2">

          <Label>State</Label>

          <Input
            placeholder="Telangana"
            {...register("state")}
          />

          {errors.state && (
            <p className="text-sm text-red-500">
              {String(errors.state.message)}
            </p>
          )}

        </div>

        {/* Country */}

        <div className="space-y-2">

          <Label>Country</Label>

          <Input
            placeholder="India"
            {...register("country")}
          />

          {errors.country && (
            <p className="text-sm text-red-500">
              {String(errors.country.message)}
            </p>
          )}

        </div>

      </div>

      {/* Bio */}

      <div className="space-y-2">

        <Label>Bio</Label>

        <Textarea
          rows={5}
          placeholder="Tell us about yourself..."
          {...register("bio")}
        />

        {errors.bio && (
          <p className="text-sm text-red-500">
            {String(errors.bio.message)}
          </p>
        )}

      </div>

    </div>
  );
}