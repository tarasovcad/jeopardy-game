import React, { useState } from 'react';
import { Card } from './ui/card';
import Image from 'next/image';

const teamsToChooseFrom = [
  {
    id: 1,
    name: 'Tralalero Tralala',
    image: '/images/TralaleroTralala.webp',
  },
  {
    id: 2,
    name: 'Bobrito Bandito',
    image: '/images/bobrito-bandito.jpg',
  },
  {
    id: 3,
    name: 'Zucchini Macanini',
    image: '/images/Zucchini_Macanini.png',
  },
  {
    id: 4,
    name: 'Chimpanzini Bananini',
    image: '/images/Chimpanzini_Bananini.png',
  },
  {
    id: 5,
    name: 'Tung tung tung tung sahur',
    image: '/images/Tung_tung_tung_tung_sahur.jpg',
  },
  {
    id: 6,
    name: 'Ballerina Cappuccina',
    image: '/images/Ballerina_Cappuccina.jpg',
  },
  {
    id: 7,
    name: 'Bombardino Crocodilo',
    image: '/images/bombardino_crocodilo.jpg',
  },
  {
    id: 8,
    name: 'Burbaloni Luliloli',
    image: '/images/Burbaloni_Luliloli.jpg',
  },
  {
    id: 9,
    name: 'Brr Brr Patatim',
    image: '/images/Brr_Brr_Patatim.jpg',
  },
  {
    id: 10,
    name: 'Madindindu Madindindu',
    image: '/images/MADINDINDU_MADINDINDU.jpg',
  },
  {
    id: 11,
    name: 'Lirili Lirili',
    image: '/images/lirili_larila.jpg',
  },
  {
    id: 12,
    name: 'Cappuccino Assassino',
    image: '/images/cappuccino_assassino.jpg',
  },
];

interface TeamCardProps {
  team: (typeof teamsToChooseFrom)[0];
  isSelected: boolean;
  onToggle: (teamId: number) => void;
  isDisabled: boolean;
}

const TeamCard = ({ team, isSelected, onToggle, isDisabled }: TeamCardProps) => {
  return (
    <Card
      className={`relative p-0 size-[155px] overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'hover:shadow-md'
      } ${isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !isDisabled && onToggle(team.id)}>
      <Image
        src={team.image}
        alt={team.name}
        width={155}
        height={155}
        className="rounded-lg object-cover"
      />
      <div className="right-0 bottom-0 left-0 absolute bg-muted py-1.5 text-center">
        <h1 className="font-bold text-sm">{team.name}</h1>
      </div>
      {isSelected && (
        <div className="top-2 right-2 absolute flex justify-center items-center bg-primary rounded-full w-6 h-6">
          <span className="font-bold text-primary-foreground text-xs">✓</span>
        </div>
      )}
    </Card>
  );
};

interface SelectTeamProps {
  selectedTeams?: number[];
  onSelectionChange?: (selectedTeamIds: number[]) => void;
  maxSelections?: number;
}

const SelectTeam = ({
  selectedTeams = [],
  onSelectionChange,
  maxSelections = 3,
}: SelectTeamProps) => {
  const [internalSelectedTeams, setInternalSelectedTeams] = useState<number[]>(selectedTeams);

  const currentSelectedTeams = onSelectionChange ? selectedTeams : internalSelectedTeams;

  const handleToggleTeam = (teamId: number) => {
    const isCurrentlySelected = currentSelectedTeams.includes(teamId);
    let newSelection: number[];

    if (isCurrentlySelected) {
      // Remove from selection
      newSelection = currentSelectedTeams.filter((id) => id !== teamId);
    } else {
      // Add to selection if under max limit
      if (currentSelectedTeams.length < maxSelections) {
        newSelection = [...currentSelectedTeams, teamId];
      } else {
        return; // Don't add if at max limit
      }
    }

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelectedTeams(newSelection);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="font-serif font-extrabold text-3xl">Select Team</h1>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Select up to {maxSelections} teams ({currentSelectedTeams.length}/{maxSelections}{' '}
            selected)
          </p>
        </div>
        <div className="gap-4 grid grid-cols-4">
          {teamsToChooseFrom.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              isSelected={currentSelectedTeams.includes(team.id)}
              onToggle={handleToggleTeam}
              isDisabled={
                currentSelectedTeams.length >= maxSelections &&
                !currentSelectedTeams.includes(team.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;
