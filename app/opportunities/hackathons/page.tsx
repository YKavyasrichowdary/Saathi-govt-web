import OpportunityCard from "@/components/opportunity/OpportunityCard";
import studentOpportunityService from "@/services/student-opportunity/student-opportunity.service";

export default async function HackathonsPage() {
  const opportunities = await studentOpportunityService.getByType("HACKATHON");

  if (!opportunities.length) {
    return (
      <div className="surface-card p-12 text-center text-muted-foreground rounded-2xl">
        No open hackathons available right now. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opp: any) => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
        />
      ))}
    </div>
  );
}