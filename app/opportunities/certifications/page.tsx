import { OpportunityCard } from "@/components/PageBits";

export default function CertificationsPage() {
  const certifications = [
    {
      title: "NPTEL — Data Structures & Algorithms",
      org: "IIT Madras",
      deadline: "Enrol by 30 Nov",
      amount: "Free · certificate ₹1,000",
    },
    {
      title: "Google Data Analytics Certificate",
      org: "Coursera · Google",
      deadline: "Self-paced",
      amount: "₹3,000 / month",
    },
    {
      title: "AWS Cloud Practitioner",
      org: "Amazon Web Services",
      deadline: "Self-paced",
      amount: "$100 exam",
    },
    {
      title: "IBM SkillsBuild — Cybersecurity",
      org: "IBM",
      deadline: "Rolling",
      amount: "Free",
    },
    {
      title: "Meta Front-End Developer",
      org: "Coursera · Meta",
      deadline: "Self-paced",
      amount: "Free with aid",
    },
    {
      title: "Microsoft Learn Student Ambassador",
      org: "Microsoft",
      deadline: "Rolling",
      amount: "Free · global network",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {certifications.map((certification) => (
        <OpportunityCard
          key={certification.title}
          tag="Certification"
          {...certification}
        />
      ))}
    </div>
  );
}