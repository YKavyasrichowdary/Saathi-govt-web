"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InterestsStep() {
  const { watch, setValue } = useFormContext();

  const interests = watch("interests") || [];

  const [interest, setInterest] = useState("");

  function addInterest() {
    const value = interest.trim();

    if (!value) return;

    if (interests.includes(value)) return;

    setValue("interests", [...interests, value]);

    setInterest("");
  }

  function removeInterest(index: number) {
    setValue(
      "interests",
      interests.filter((_: string, i: number) => i !== index)
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Interests
        </h2>

        <p className="text-muted-foreground mt-2">
          What are you interested in learning or exploring?
        </p>

      </div>

      <div className="flex gap-3">

        <Input
          placeholder="Artificial Intelligence"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />

        <Button
          type="button"
          onClick={addInterest}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>

      </div>

      <div className="flex flex-wrap gap-3">

        {interests.map((item: string, index: number) => (

          <div
            key={index}
            className="flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <span>{item}</span>

            <button
              type="button"
              onClick={() => removeInterest(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}