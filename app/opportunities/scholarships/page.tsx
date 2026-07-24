import OpportunityCard from "@/components/opportunity/OpportunityCard";
import studentOpportunityService from "@/services/student-opportunity/student-opportunity.service";

export default async function ScholarshipsPage() {
  const opportunities = await studentOpportunityService.getByType("SCHOLARSHIP");

  if (!opportunities.length) {
    return (
      <div className="surface-card p-12 text-center text-muted-foreground rounded-2xl">
        No open scholarships available right now. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opp) => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
        />
      ))}
    </div>
  );
}