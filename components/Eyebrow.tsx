import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Eyebrow({
  children,
}: Props) {
  return (
    <span className="text-eyebrow inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}