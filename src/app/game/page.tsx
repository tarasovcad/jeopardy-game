'use client';
import React from 'react';
import { useGameStore } from '@/lib/store';
import { redirect } from 'next/navigation';

const Game = () => {
  const { numberOfTeams, selectedTeams } = useGameStore();
  if (numberOfTeams === 0 || selectedTeams.length === 0) {
    redirect('/game/teams');
  }
  return <div>MAIN GAME</div>;
};

export default Game;
