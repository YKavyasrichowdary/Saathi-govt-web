"use client";

import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  OpportunityForm as OpportunityFormType,
  opportunitySchema,
} from "@/schemas/opportunity.schema";

import BasicInformationSection from "./BasicInformationSection";
import EligibilitySection from "./EligibilitySection";
import DateSection from "./DateSection";
import PublishingSection from "./PublishingSection";

import { Button } from "@/components/ui/button";

interface Props {
  defaultValues?: Partial<OpportunityFormType>;
  isEdit?: boolean;
  opportunityId?: string;
}

export default function OpportunityForm({
  defaultValues,
  isEdit = false,
  opportunityId,
}: Props) {
  const router = useRouter();

  const methods = useForm<OpportunityFormType>({
    resolver: zodResolver(opportunitySchema) as any,

    defaultValues: {
      title: "",
      organization: "",

      source: "GOVERNMENT",

      type: "SCHOLARSHIP",

      mode: "ONLINE",

      status: "DRAFT",

      location: "",

      city: "",

      state: "",

      registrationLink: "",

      imageUrl: "",

      bannerUrl: "",

      amount: "",

      educationLevel: undefined,

      course: "",

      specialization: "",

      minCGPA: undefined,

      deadline: "",

      startDate: "",

      endDate: "",

      description: "",

      eligibility: "",

      benefits: "",

      applicationProcess: "",

      featured: false,

      verified: false,

      ...defaultValues,
    },
  });

  async function onSubmit(values: OpportunityFormType) {
    try {
      const response = await fetch(
        isEdit
          ? `/api/admin/opportunities/${opportunityId}`
          : "/api/admin/opportunities",
        {
          method: isEdit ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        isEdit
          ? "Opportunity updated successfully."
          : "Opportunity created successfully."
      );

      router.push("/admin/opportunities");

      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <BasicInformationSection />

        <EligibilitySection />

        <DateSection />

        <PublishingSection />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button type="submit">
            {isEdit
              ? "Update Opportunity"
              : "Create Opportunity"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}