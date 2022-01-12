import * as React from 'react';
import { Text, View } from 'react-native';

import { removeSolution, updateSolution, SetSolutions, Solution } from '../globalState';
import { SolutionCard } from '../solutions';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ setSolutions, solutions }: RootTabScreenProps<'Solutions'> & Props) {
  return (
    <Screen title="solutions">
      <View>
        {solutions.map(s => (
          <SolutionCard
            onChange={updateSolution(setSolutions, solutions)}
            onRemove={handeRemoveSolution(setSolutions, solutions, s)}
            key={s.id}
            solution={s}
            />
        ))}
      </View>
    </Screen>
  );
}

const handeRemoveSolution = (
  setSolutions: SetSolutions,
  solutions: Solution[],
  solution: Solution
) => () => removeSolution(setSolutions, solutions)(solution);

