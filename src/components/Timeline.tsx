'use client';

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';

const steps = [
  {
    step: 1,
    title: 'Select Number ',
  },
  {
    step: 2,
    title: 'Select Team',
  },
  {
    step: 3,
    title: 'Start Game',
  },
];
export default function Timeline({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <div className="space-y-8 mx-auto max-w-xl text-center">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step} className="not-last:flex-1 max-md:items-start">
            <StepperTrigger
              className="flex-col rounded"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}>
              <StepperIndicator />
              <div className="md:text-left text-center">
                <StepperTitle>{title}</StepperTitle>
              </div>
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
