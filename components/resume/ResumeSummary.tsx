interface Props {
  summary: string;
}

export default function ResumeSummary({
  summary,
}: Props) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold">
        AI Summary
      </h3>

      <p className="mt-4 leading-8 text-muted-foreground">
        {summary}
      </p>
    </div>
  );
}