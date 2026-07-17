import { OpportunityCard } from "@/components/PageBits";

export default function HackathonsPage() {
  const hackathons = [
    {
      title: "Smart India Hackathon 2026",
      org: "AICTE + MoE",
      deadline: "3 Dec",
      amount: "₹1L per team",
    },
    {
      title: "HackWithInfy — Infosys Coding Contest",
      org: "Infosys",
      deadline: "18 Jan",
      amount: "PPO + prizes",
    },
    {
      title: "Flipkart GRiD Challenge",
      org: "Flipkart",
      deadline: "22 Nov",
      amount: "₹4L + internship",
    },
    {
      title: "Toycathon by MoE",
      org: "Ministry of Education",
      deadline: "12 Feb",
      amount: "₹50,000 + mentorship",
    },
    {
      title: "IIT Delhi Tryst Hackathon",
      org: "IIT Delhi",
      deadline: "9 Mar",
      amount: "₹1.5L pool",
    },
    {
      title: "Google Solution Challenge",
      org: "Google Developer Student Clubs",
      deadline: "24 Jan",
      amount: "Global recognition",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {hackathons.map((hackathon) => (
        <OpportunityCard
          key={hackathon.title}
          tag="Hackathon"
          {...hackathon}
        />
      ))}
    </div>
  );
}