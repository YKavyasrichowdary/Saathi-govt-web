import { Button } from "@/components/ui/button";

interface Props {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function Navigation({
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}: Props) {
  return (
    <div className="flex justify-between mt-10">

      <Button
        variant="outline"
        disabled={isFirstStep}
        onClick={onBack}
      >
        Back
      </Button>

      <Button
        onClick={onNext}
      >
        {isLastStep ? "Complete Profile" : "Next"}
      </Button>

    </div>
  );
}