import * as React from 'react';
import { Solution } from '../globalState';
import { Picker, PickerItem } from '../components';
import { brandSolutions } from '../constants/brands';

/**
 * Preloaded with brands
 */

type Props = {
  onChange?: (s: Solution) => void;
  solutions?: Solution[];
  solution?: Solution;
};

export const SolutionPicker: React.FC<Props> = ({ onChange, solution, solutions = [] }) => {
  const allSolutions = [...solutions, ...brandSolutions];
  return (
    <Picker
      label="solution"
      onValueChange={onChange ? handleSetSolution(onChange, allSolutions) : undefined}
      selectedValue={solution?.name}
    >
      <PickerItem key="none" label="None selected" value={undefined} />
      {allSolutions.map(s => <PickerItem key={s.id} label={s.name} value={s.name}/>)}
    </Picker>
  );
};

const handleSetSolution = (
  setSolution: (s: Solution) => void,
  solutions: Solution[]
) => (solutionName?: string | number) => {
  const solution = solutions.find(s => s.name === solutionName);
  if (solution) {
    setSolution(solution);
  }
};
