import { useId } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function TeamsNumber({ setTeams }: { setTeams: (teams: number) => void }) {
  const id = useId();

  const items = [
    { value: '1', label: '1 team' },
    { value: '2', label: '2 teams' },
    { value: '3', label: '3 teams' },
    { value: '4', label: '4 teams' },
    { value: '5', label: '5 teams' },
    { value: '6', label: '6 teams' },
  ];

  return (
    <>
      <h1 className="font-serif font-extrabold text-3xl">How many teams?</h1>
      <fieldset className="space-y-4">
        <RadioGroup
          className="gap-2 grid grid-cols-3"
          defaultValue="1"
          onValueChange={(value) => setTeams(Number(value))}>
          {items.map((item) => (
            <label
              key={`${id}-${item.value}`}
              className="relative flex flex-col items-center gap-3 has-data-disabled:opacity-50 shadow-xs px-5 py-3 border border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring rounded-md outline-none has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 w-full text-center transition-[color,box-shadow] cursor-pointer has-data-disabled:cursor-not-allowed">
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                className="sr-only after:absolute after:inset-0"
              />
              <p className="font-medium text-foreground text-sm leading-none">{item.label}</p>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
    </>
  );
}
