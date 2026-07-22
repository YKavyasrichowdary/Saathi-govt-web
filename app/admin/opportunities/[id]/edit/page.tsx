import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { adminNavigation } from "@/config/admin-navigation";
import OpportunityForm from "@/components/admin/opportunity/OpportunityForm";
import opportunityService from "@/services/opportunity/opportunity.service";

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = await opportunityService.getById(id);

  if (!opportunity) {
    notFound();
  }

  const defaultValues = {
    title: opportunity.title,
    organization: opportunity.organization,
    source: opportunity.source,
    type: opportunity.type,
    mode: opportunity.mode,
    status: opportunity.status,
    location: opportunity.location || "",
    city: opportunity.city || "",
    state: opportunity.state || "",
    registrationLink: opportunity.registrationLink,
    imageUrl: opportunity.imageUrl || "",
    bannerUrl: opportunity.bannerUrl || "",
    amount: opportunity.amount || "",
    educationLevel: opportunity.educationLevel || undefined,
    course: opportunity.course || "",
    specialization: opportunity.specialization || "",
    minCGPA: opportunity.minCGPA || undefined,
    deadline: opportunity.deadline ? new Date(opportunity.deadline).toISOString().split("T")[0] : "",
    startDate: opportunity.startDate ? new Date(opportunity.startDate).toISOString().split("T")[0] : "",
    endDate: opportunity.endDate ? new Date(opportunity.endDate).toISOString().split("T")[0] : "",
    description: opportunity.description,
    eligibility: opportunity.eligibility || "",
    benefits: opportunity.benefits || "",
    applicationProcess: opportunity.applicationProcess || "",
    featured: opportunity.featured,
    verified: opportunity.verified,
  };

  return (
    <AppShell
      navigation={adminNavigation}
      title="Edit Opportunity"
      subtitle={`Editing "${opportunity.title}"`}
    >
      <OpportunityForm
        isEdit
        opportunityId={id}
        defaultValues={defaultValues as any}
      />
    </AppShell>
  );
}
