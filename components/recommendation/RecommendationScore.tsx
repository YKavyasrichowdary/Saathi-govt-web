import {
  getScoreColor,
  getScoreLabel,
} from "@/lib/intelligence/score";

interface Props {
  score: number;
}

export default function RecommendationScore({
  score,
}: Props) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 text-center shadow-sm ${getScoreColor(
        score
      )}`}
    >
      <div className="text-3xl font-bold">
        {score}%
      </div>

      <div className="mt-1 text-xs font-semibold uppercase tracking-wide">
        {getScoreLabel(score)}
      </div>
    </div>
  );
}