import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}
    >
      {children}
    </section>
  );
}