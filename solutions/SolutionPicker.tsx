import * as React from 'react';
import { View, Text } from 'react-native';
import { Solution } from '../globalState';
import { NpkLabel, Picker, PickerItem } from '../components';
import { brandSolutions } from '../constants/brands';

/**
 * Preloaded with brands
 */

type Props = {
  onChange?: (s: Solution) => void;
  solutions?: Solution[];
  solution?: Solution;
  pickerRef?: React.RefObject<any>;
  open?: boolean;
};

export const SolutionPicker: React.FC<Props> = ({ pickerRef, onChange, solution, solutions = [], open = false, }) => {
  const allSolutions = [...solutions, ...brandSolutions];
  return (
    <Picker
      openOverride={open}
      label="Pick a solution"
      onValueChange={onChange ? handleSetSolution(onChange, allSolutions) : undefined}
      selectedValue={solution?.name}
    >
        <PickerItem key="none" label={<Text>None selected</Text>} value={undefined} />
          {allSolutions.map(s =>
                            <PickerItem
                              key={s.id}
                              label={
                                <View>
                                  <Text>{s.name}</Text>
                                  <NpkLabel npk={s.targetNpk} />
                                </View>
                              }
                              value={s.name}
                            />
                           )}
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
