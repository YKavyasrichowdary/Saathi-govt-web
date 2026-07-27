"use client";

interface WizardNavigationProps {
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  canNext?: boolean;
}

export default function WizardNavigation({
  currentStep = 1,
  totalSteps = 4,
  onBack,
  onNext,
  canNext = true,
}: WizardNavigationProps) {
  if (currentStep <= 0) return null;

  return (
    <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
      {onBack ? (
        <button
          onClick={onBack}
          className="rounded-2xl border border-border px-6 py-3 font-medium transition hover:border-primary"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      {onNext && (
        <button
          onClick={onNext}
          disabled={!canNext}
          className="btn-primary px-8 py-3 disabled:opacity-50"
        >
          {currentStep === totalSteps ? "Generate Roadmap" : "Continue"}
        </button>
      )}
    </div>
  );
}
