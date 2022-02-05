import * as React from 'react';
import { Solution, SolutionInput } from '../globalState';
import { Picker, PickerItem } from '../components';
import { brandSolutionInputs } from '../constants/brands';
import * as inputCalculator from '../recipe/inputCalculator';

/**
 * all solutions can be solution inputs
 */
type Props = {
  onChange?: (s: SolutionInput) => void;
  solutions?: Solution[];
  solutionInput?: SolutionInput;
};

export const SolutionInputPicker: React.FC<Props> = ({
  onChange,
  solutionInput,
  solutions = [],
}) => {
  const allSolutionInputs = [
    ...solutions.map(s => ({
      id: `${s.id}-calculated-input`,
      name: s.name,
      //brand?: string; TODO might be useful to add this to the solution
      npk: s.targetNpk,
      tspsPerGallon1kEC: s.inputs.reduce((acc, s) => acc + (s.frac*s.solution.tspsPerGallon1kEC), 0)
    })),
    ...brandSolutionInputs
  ];
  return (
    <Picker
      label="solution"
      onValueChange={onChange ? handleSetSolutionInput(onChange, allSolutionInputs) : undefined}
      selectedValue={solutionInput?.name}
    >
      <PickerItem key="none" label="None selected" value={undefined} />
      {allSolutionInputs.map(s => <PickerItem key={s.id} label={s.name} value={s.name}/>)}
    </Picker>
  );
};

const handleSetSolutionInput = (
  setSolutionInput: (s: SolutionInput) => void,
  solutions: SolutionInput[]
) => (solutionName?: string | number) => {
  const solutionInput = solutions.find(s => s.name === solutionName);
  if (solutionInput) {
    setSolutionInput(solutionInput);
  }
};
