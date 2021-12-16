import * as React from 'react';

import { SetRecipes, Recipe } from '../globalState';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';

type Props = {
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function MyRecipes({ navigation }: RootTabScreenProps<'MyRecipes'> & Props) {
  return (
    <Screen title="my recipes">
      <View />
    </Screen>
  );
}
