import * as React from 'react';
import { Text, View } from 'react-native';

import { SetSolutions, Solution } from '../globalState';
import { SolutionCard } from '../solutions';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ solutions, navigation }: RootTabScreenProps<'Solutions'> & Props) {
  return (
    <Screen title="solutions">
      <View>
        {solutions.map(s => <SolutionCard key={s.name} solution={s} />)}
      </View>
    </Screen>
  );
}
