"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  "Daily Study Time",
  "Current Confidence",
  "Career Goal",
  "Study Schedule",
];

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="mb-10">

      {/* Progress */}

      <div className="flex items-center">

        {Array.from({ length: totalSteps }).map((_, index) => {
          const active = index + 1 <= currentStep;

          return (
            <div
              key={index}
              className="flex flex-1 items-center"
            >
              <div
                className={`h-5 w-5 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />

              {index !== totalSteps - 1 && (
                <div
                  className={`h-1 flex-1 transition-all duration-300 ${
                    index + 1 < currentStep
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}

      <div className="mt-6">

        <p className="text-sm font-medium text-primary">
          Step {currentStep} of {totalSteps}
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {stepTitles[currentStep - 1]}
        </h2>

      </div>

    </div>
  );
}