"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SkillsStep() {
  const { watch, setValue, control } = useFormContext();

  const skills = watch("skills") || [];

  const [skillName, setSkillName] = useState("");

  const [skillLevel, setSkillLevel] = useState<
    "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  >("BEGINNER");

  function addSkill() {
    if (!skillName.trim()) return;

    setValue("skills", [
      ...skills,
      {
        name: skillName.trim(),
        level: skillLevel,
      },
    ]);

    setSkillName("");
    setSkillLevel("BEGINNER");
  }

  function removeSkill(index: number) {
    setValue(
      "skills",
      skills.filter((_: any, i: number) => i !== index)
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Skills
        </h2>

        <p className="text-muted-foreground mt-2">
          Add the skills you currently have.
        </p>

      </div>

      <div className="grid md:grid-cols-[1fr_220px_auto] gap-4">

        <Input
          placeholder="React"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />

        <Controller
          control={control}
          name="__dummySkillLevel"
          render={() => (
            <Select
              value={skillLevel}
              onValueChange={(value) =>
                setSkillLevel(
                  value as
                    | "BEGINNER"
                    | "INTERMEDIATE"
                    | "ADVANCED"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="BEGINNER">
                  Beginner
                </SelectItem>

                <SelectItem value="INTERMEDIATE">
                  Intermediate
                </SelectItem>

                <SelectItem value="ADVANCED">
                  Advanced
                </SelectItem>

              </SelectContent>

            </Select>
          )}
        />

        <Button
          type="button"
          onClick={addSkill}
        >
          <Plus className="w-4 h-4 mr-2" />

          Add
        </Button>

      </div>

      <div className="space-y-3">

        {skills.length === 0 && (

          <div className="text-sm text-muted-foreground">
            No skills added yet.
          </div>

        )}

        {skills.map((skill: any, index: number) => (

          <div
            key={index}
            className="flex justify-between items-center rounded-xl border p-4"
          >

            <div>

              <div className="font-medium">
                {skill.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {skill.level}
              </div>

            </div>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => removeSkill(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>

          </div>

        ))}

      </div>

    </div>
  );
}