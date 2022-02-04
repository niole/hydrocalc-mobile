import * as React from 'react';
import { View } from 'react-native';

import { InfoBox, AddButton, FlatList } from '../components';
import { addSolution, removeSolution, updateSolution, SetSolutions, Solution } from '../globalState';
import { SolutionCard } from '../solutions';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { NewSolution } from '../solutions/types';

const getId = () => `${Math.random()}`;
const createDefaultSolution = () => ({ id: getId(), name: 'untitled', inputs: [], targetNpk: { n:0, p:0, k:0 }});

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ setSolutions, solutions }: RootTabScreenProps<'Solutions'> & Props) {
  return (
    <Screen title="solutions">
      <AddButton size="big" onPress={() => addSolution(setSolutions, solutions, createDefaultSolution())} />
        {solutions.length === 0 ? (
          <InfoBox title="Create a custom solution.">
            {'Can\'t find a solution with the right NPK ratio or need to combine solutions?\n\nAdd your own solution here.'}
          </InfoBox>
        ) : <FlatList
        data={solutions.reverse()}
        renderItem={({ item }) => (
          <SolutionCard
            onChange={updateSolution(setSolutions, solutions)}
            onRemove={handeRemoveSolution(setSolutions, solutions, item)}
            key={item.id}
            solution={item}
            />
        )}
      />}
    </Screen>
  );
}

const handeRemoveSolution = (
  setSolutions: SetSolutions,
  solutions: Solution[],
  solution: Solution
) => () => removeSolution(setSolutions, solutions)(solution);

