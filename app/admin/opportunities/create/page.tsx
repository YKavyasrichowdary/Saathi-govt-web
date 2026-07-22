import { AppShell } from "@/components/AppShell";
import { adminNavigation } from "@/config/admin-navigation";

import OpportunityForm from "@/components/admin/opportunity/OpportunityForm";

export default function CreateOpportunityPage() {
  return (
    <AppShell
      navigation={adminNavigation}
      title="Create Opportunity"
      subtitle="Add a new opportunity for students."
    >
      <OpportunityForm />
    </AppShell>
  );
}