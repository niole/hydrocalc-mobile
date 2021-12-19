import * as React from 'react';
import { Picker, Button, Text, View } from 'react-native';

import { BucketSize, SetRecipes, Recipe, Solution } from '../globalState';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { CalculatedRecipeView } from '../recipe';

type Props = {
  solutions: Solution[];
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function Calculator({ recipes, navigation }: RootTabScreenProps<'Calculator'> & Props) {
  return (
    <Screen title="calculator">
      <View>
        <CalculatedRecipeView recipes={recipes} />
        <Button
          onPress={() => console.log('cat')}
          title="Press Me"
        />
      </View>
    </Screen>
  );
}
