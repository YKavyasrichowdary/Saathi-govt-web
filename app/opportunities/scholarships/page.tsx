import { OpportunityCard } from "@/components/PageBits";

export default function ScholarshipsPage() {
  const scholarships = [
    {
      title: "National Means-cum-Merit Scholarship (NMMS)",
      org: "Ministry of Education",
      deadline: "21 Nov",
      amount: "₹12,000 / year",
    },
    {
      title: "INSPIRE Scholarship for Higher Education",
      org: "Department of Science & Technology",
      deadline: "15 Dec",
      amount: "₹80,000 / year",
    },
    {
      title: "Post-Matric Scholarship for SC Students",
      org: "Ministry of Social Justice",
      deadline: "31 Dec",
      amount: "Full tuition + stipend",
    },
    {
      title: "Kishore Vaigyanik Protsahan Yojana",
      org: "IISc Bangalore",
      deadline: "8 Nov",
      amount: "₹7,000 / month",
    },
    {
      title: "Tata Trusts Scholarship",
      org: "Tata Trusts",
      deadline: "10 Dec",
      amount: "Up to ₹2L / year",
    },
    {
      title: "Reliance Foundation Undergraduate Scholarship",
      org: "Reliance Foundation",
      deadline: "22 Nov",
      amount: "₹2L one-time",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {scholarships.map((scholarship) => (
        <OpportunityCard
          key={scholarship.title}
          tag="Scholarship"
          {...scholarship}
        />
      ))}
    </div>
  );
}