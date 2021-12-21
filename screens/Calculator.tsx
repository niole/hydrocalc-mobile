import * as React from 'react';
import { TextInput, Picker, Button, Text, View } from 'react-native';

import { Tabs, Tab } from '../components/Tabs';
import { BucketSize, SetRecipes, Recipe, Solution } from '../globalState';
import { ValidatedSizeForm } from '../components/ValidatedSizeForm';
import { ValidatedVolumeForm } from '../components/ValidatedVolumeForm';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { CalculatedRecipeView } from '../recipe';

enum VolumeView { Volume, Size };

type Props = {
  solutions: Solution[];
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function Calculator({ solutions, recipes, navigation }: RootTabScreenProps<'Calculator'> & Props) {
  const [ec, setEc] = React.useState<number | undefined>();
  const [bucketSize, setBucketSize] = React.useState<BucketSize | undefined>();
  const [solution, setSolution] = React.useState<Solution | undefined>();
  const [wipRecipe, setWipRecipe] = React.useState<Recipe | undefined>();

  React.useEffect(() => {
    if (ec && solution && bucketSize) {
      setWipRecipe({
        name: 'untitled recipe',
        solution,
        bucketSize,
        ec
      });
    }
  }, [ec, solution, bucketSize]);

  return (
    <Screen title="calculator">
      <View>
        <CalculatedRecipeView recipes={recipes} defaultRecipe={wipRecipe} />
        <TextInput placeholder="EC (millisiemens/cm)" onChangeText={handleSetEc(setEc)} />
        <Picker onValueChange={handleSetSolution(setSolution, solutions)}>
          <Picker.Item label="none" value={undefined} />
          {solutions.map(s => <Picker.Item label={s.name} value={s.name}/>)}
        </Picker>
        <Tabs defaultKey="volume">
          <Tab title="Volume" id="volume">
            <ValidatedVolumeForm onChange={setBucketSize} />
          </Tab>
          <Tab title="Size" id="size">
            <ValidatedSizeForm onChange={setBucketSize} />
          </Tab>
        </Tabs>
      </View>
    </Screen>
  );
}

const handleSetEc = (setEc: (ec: number) => void) => (t: string) => {
    try {
      setEc(parseFloat(t));
    } catch (error) {
      console.error("someething went wrong when parsing ec input: ", error);
    }
};

const handleSetSolution = (setSolution: (s?: Solution) => void, solutions: Solution[]) => (solutionName?: string) => {
  setSolution(solutions.find(s => s.name === solutionName));
};
