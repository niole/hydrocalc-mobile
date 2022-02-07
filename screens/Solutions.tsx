import * as React from 'react';
import { View } from 'react-native';

import { InfoBox, AddButton, FlatList } from '../components';
import { FractionalInput, NPK, addSolution, removeSolution, updateSolution, SetSolutions, Solution } from '../globalState';
import { SolutionCard } from '../solutions';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { NewSolution } from '../solutions/types';

const getId = () => `${Math.random()}`;
const createDefaultSolution = () => ({
  id: getId(),
  inputs: [],
  targetNpk: { n:0, p:0, k:0 },
  isWip: true as true,
});

type WipSolution = {
  isWip: true;
  id: string;
  name?: string;
  inputs: FractionalInput[];
  targetNpk: NPK;
};

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ setSolutions, solutions }: RootTabScreenProps<'Solutions'> & Props) {
  const [wipSolutions, setWipSolutions] = React.useState<WipSolution[]>([]);

  const onSolutionChange = (solution: Solution) => {
    const wipSolutionIndex = wipSolutions.findIndex(s => s.id === solution.id);
    if (wipSolutionIndex > -1) {
      const updatedSolution = wipSolutions[wipSolutionIndex];
      setWipSolutions(wipSolutions.slice(0, wipSolutionIndex).concat(wipSolutions.slice(wipSolutionIndex+1)));
      // @ts-ignore
      delete solution.isWip;
      solution.id = Math.random().toString();
      updateSolution(setSolutions, solutions)(solution);
    } else {
      updateSolution(setSolutions, solutions)(solution);
    }
  };

  const onSolutionRemove = (solution: Solution) => () => {
    const wipSolutionIndex = wipSolutions.findIndex(s => s.id === solution.id);
    if (wipSolutionIndex > -1) {
      setWipSolutions([...wipSolutions.slice(0, wipSolutionIndex), ...wipSolutions.slice(wipSolutionIndex+1)]);
    } else {
      handeRemoveSolution(setSolutions, solutions, solution)();
    }

  };

  return (
    <Screen title="solutions">
      <AddButton size="big" onPress={() => setWipSolutions([createDefaultSolution(), ...wipSolutions])} />
        {wipSolutions.length == 0 && solutions.length === 0 ? (
          <InfoBox
            title="Create a custom solution."
            onPress={() => setWipSolutions([createDefaultSolution(), ...wipSolutions])}
          >
            {'Can\'t find a solution with the right NPK ratio or need to combine solutions?\n\nAdd your own solution here.'}
          </InfoBox>
        ) : (
        <FlatList
          data={[...wipSolutions, ...solutions.reverse()]}
          renderItem={({ item }) => (
            <SolutionCard
              editable={item.isWip}
              solutions={solutions.filter(s => s.id !== item.id)}
              onChange={onSolutionChange}
              onRemove={onSolutionRemove(item)}
              key={item.id}
              solution={item}
            />
          )}
        />
      )}
    </Screen>
  );
}

const handeRemoveSolution = (
  setSolutions: SetSolutions,
  solutions: Solution[],
  solution: Solution
) => () => removeSolution(setSolutions, solutions)(solution);

