import * as React from 'react';

import { SetSolutions, Solution } from '../globalState';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ navigation }: RootTabScreenProps<'Solutions'> & Props) {
  return (
    <Screen title="solutions">
      <View />
    </Screen>
  );
}
