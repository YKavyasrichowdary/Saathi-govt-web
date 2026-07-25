import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  slug: string;
}

export default function RecommendationActions({
  slug,
}: Props) {
  return (
    <Link
      href={`/opportunities/${slug}`}
      className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
    >
      View Opportunity

      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}