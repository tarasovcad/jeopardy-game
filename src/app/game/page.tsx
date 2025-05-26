'use client';
import React from 'react';
import { useGameStore } from '@/lib/store';
import { redirect } from 'next/navigation';
import Board from '@/components/Board';

const Game = () => {
  const { numberOfTeams, selectedTeams } = useGameStore();
  if (numberOfTeams === 0 || selectedTeams.length === 0) {
    redirect('/game/teams');
  }

  return (
    <div className="mx-auto py-30 ">
      <Board />
    </div>
  );
};

export default Game;
