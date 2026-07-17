import { OpportunityCard } from "@/components/PageBits";

export default function SchemesPage() {
  const schemes = [
    {
      title: "PM Vidyalaxmi — Education Loan up to ₹10L",
      org: "Government of India",
      deadline: "Rolling",
      amount: "Interest subsidy",
    },
    {
      title: "Pradhan Mantri Kaushal Vikas Yojana",
      org: "Ministry of Skill Development",
      deadline: "Rolling",
      amount: "Free skilling",
    },
    {
      title: "Beti Bachao Beti Padhao — Girl Child Support",
      org: "Ministry of Women & Child",
      deadline: "Rolling",
      amount: "State-linked benefits",
    },
    {
      title: "AICTE Pragati Scholarship for Girls",
      org: "AICTE",
      deadline: "30 Nov",
      amount: "₹50,000 / year",
    },
    {
      title: "Central Sector Interest Subsidy Scheme",
      org: "Ministry of Education",
      deadline: "Rolling",
      amount: "100% interest",
    },
    {
      title: "State Nivas — Domicile Housing for Students",
      org: "State Government",
      deadline: "Ongoing",
      amount: "Subsidised stay",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {schemes.map((scheme) => (
        <OpportunityCard
          key={scheme.title}
          tag="Govt Scheme"
          {...scheme}
        />
      ))}
    </div>
  );
}