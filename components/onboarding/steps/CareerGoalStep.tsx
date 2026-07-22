"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CareerGoalStep() {
  const { watch, setValue } = useFormContext();

  const careerGoals = watch("careerGoals") || [];

  const [goal, setGoal] = useState("");

  function addGoal() {
    const value = goal.trim();

    if (!value) return;

    if (careerGoals.includes(value)) return;

    setValue("careerGoals", [...careerGoals, value]);

    setGoal("");
  }

  function removeGoal(index: number) {
    setValue(
      "careerGoals",
      careerGoals.filter((_: string, i: number) => i !== index)
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Career Goals
        </h2>

        <p className="text-muted-foreground mt-2">
          What do you want to achieve?
        </p>

      </div>

      <div className="flex gap-3">

        <Input
          placeholder="Software Engineer at Google"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <Button
          type="button"
          onClick={addGoal}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>

      </div>

      <div className="space-y-3">

        {careerGoals.map((item: string, index: number) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <span>{item}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeGoal(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>

          </div>

        ))}

      </div>

    </div>
  );
}