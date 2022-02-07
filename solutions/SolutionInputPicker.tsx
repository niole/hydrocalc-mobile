import * as React from 'react';
import { Solution, SolutionInput } from '../globalState';
import { Picker, PickerItem } from '../components';
import { brandSolutionInputs } from '../constants/brands';
import * as inputCalculator from '../recipe/inputCalculator';

const CUSTOM_INPUT_VALUE = 'custom';

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
      npk: s.targetNpk,
      tspsPerGallon1kEC: s.inputs.reduce((acc, s) => acc + (s.frac*s.solution.tspsPerGallon1kEC), 0)
    })),
    ...brandSolutionInputs
  ];
  return (
    <Picker
      label="Add a solution input"
      onValueChange={onChange ? handleSetSolutionInput(onChange, allSolutionInputs) : undefined}
      selectedValue={solutionInput?.name}
    >
      <PickerItem key="none" label="None selected" value={undefined} />
      <PickerItem key="custom" label="Custom input" value={CUSTOM_INPUT_VALUE} />
      {allSolutionInputs.map(s => <PickerItem key={s.id} label={s.name} value={s.name}/>)}
    </Picker>
  );
};

const handleSetSolutionInput = (
  setSolutionInput: (s: SolutionInput) => void,
  solutions: SolutionInput[]
) => (solutionName?: string | number) => {
  if (!!solutionName) {
    if (solutionName === CUSTOM_INPUT_VALUE) {
      setSolutionInput({
        id: Math.random().toString(),
        name: 'custom input',
        npk: { n: 0, p: 0, k: 0 },
        tspsPerGallon1kEC: 0
      });
    } else {
      const solutionInput = solutions.find(s => s.name === solutionName);
      if (solutionInput) {
        setSolutionInput(solutionInput);
      }
    }
  }
};
