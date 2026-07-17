import { OpportunityCard } from "@/components/PageBits";

export default function InternshipsPage() {
  const internships = [
    {
      title: "ISRO Summer Internship — Space Science",
      org: "ISRO",
      deadline: "15 Feb",
      amount: "Stipend + certificate",
    },
    {
      title: "IIT Bombay Research Internship",
      org: "IIT Bombay",
      deadline: "1 Mar",
      amount: "₹15,000 / month",
    },
    {
      title: "Zerodha Varsity Content Internship",
      org: "Zerodha",
      deadline: "Rolling",
      amount: "₹25,000 / month",
    },
    {
      title: "SEBI National Institute Internship",
      org: "SEBI",
      deadline: "20 Dec",
      amount: "₹20,000 / month",
    },
    {
      title: "Smart Cities Mission Fellowship",
      org: "MoHUA",
      deadline: "10 Jan",
      amount: "₹40,000 / month",
    },
    {
      title: "Microsoft Engage — 6 week program",
      org: "Microsoft India",
      deadline: "5 Feb",
      amount: "Mentorship + PPO",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {internships.map((internship) => (
        <OpportunityCard
          key={internship.title}
          tag="Internship"
          {...internship}
        />
      ))}
    </div>
  );
}