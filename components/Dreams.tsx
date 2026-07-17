import Section from "./Section";

const dreams = [
  "Scholarships",
  "GATE",
  "Placements",
  "Government Exams",
  "Internships",
  "Hackathons",
  "Certifications",
  "Higher Studies",
];

export default function Dreams() {
  return (
    <div className="border-y border-border/70 bg-surface/50 py-8">
      <Section>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-eyebrow">
            One companion · every dream
          </span>

          {dreams.map((dream) => (
            <span
              key={dream}
              className="text-[15px] font-semibold tracking-tight text-foreground/70"
            >
              {dream}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
