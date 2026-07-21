interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: Props) {
  return (
    <div>

      <div className="flex justify-between items-center mb-2">

        <h2 className="text-2xl font-semibold">
          Complete Your Profile
        </h2>

        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>

      </div>

      <div className="flex gap-2">

        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}

      </div>

    </div>
  );
}