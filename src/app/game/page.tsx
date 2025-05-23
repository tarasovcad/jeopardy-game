'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import TeamsNumber from '@/components/TeamsNumber';
const Game = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [teams, setTeams] = useState(1);

  return (
    <div>
      <div className="top-0 left-0 fixed px-7 py-10 w-full">
        <Timeline currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-12">
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-serif font-extrabold text-3xl">
              {currentStep === 1 ? 'How many teams?' : 'Select Team'}
            </h1>
            {currentStep === 1 && <TeamsNumber setTeams={setTeams} />}
            {/* {currentStep === 2 && <Component setTeams={setTeams} />} */}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Link href="/game?step=1">
              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => setCurrentStep((prev) => prev + 1)}>
                Next Step
              </Button>
            </Link>
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
