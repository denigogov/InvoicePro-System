import { ReactElement, useState } from "react";

export const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const previuse = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const currentPageIs = (index: number) => setCurrentStepIndex(index);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    currentPageIs,
    next,
    previuse,
    steps,
    isFirstStep: currentStepIndex === 0,
    isSecoundStep: currentStepIndex === 1,
    isThirdStep: currentStepIndex === 2,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};
