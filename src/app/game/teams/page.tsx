'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import TeamsNumber from '@/components/TeamsNumber';
import SelectTeam from '@/components/SelectTeam';
import HowToPlay from '@/components/HowToPlay';
import { redirect } from 'next/navigation';
import { useGameStore } from '@/lib/store';

const Game = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { numberOfTeams, selectedTeams, setNumberOfTeams, setSelectedTeams } = useGameStore();

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      redirect('/game');
    }
  };

  return (
    <div>
      <div className="top-0 left-0 fixed px-7 py-10 w-full">
        <Timeline currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-12">
          <div className="flex flex-col items-center gap-6">
            {currentStep === 1 && <TeamsNumber setTeams={setNumberOfTeams} />}
            {currentStep === 2 && (
              <SelectTeam
                selectedTeams={selectedTeams}
                onSelectionChange={setSelectedTeams}
                maxSelections={numberOfTeams}
              />
            )}
            {currentStep === 3 && <HowToPlay />}
          </div>
          <div className="flex flex-col gap-3 w-full min-w-[305px]">
            <Button
              type="button"
              className="w-full cursor-pointer"
              disabled={currentStep === 2 && selectedTeams.length !== numberOfTeams}
              onClick={handleNextStep}>
              Next Step
            </Button>

            <Button
              type="button"
              className="w-full cursor-pointer"
              variant={'outline'}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
