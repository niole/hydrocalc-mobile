import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { SetRecipes, Recipe, Solution } from '../globalState';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';

type Props = {
  solutions: Solution[];
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function Calculator({ navigation }: RootTabScreenProps<'Calculator'> & Props) {
  return (
    <Screen title="calculator">
      <View>
        <Button
          onPress={() => console.log('cat')}
          title="Press Me"
        />
      </View>
    </Screen>
  );
}
