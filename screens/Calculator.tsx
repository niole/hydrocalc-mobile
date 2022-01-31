import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

import { Tabs, Tab } from '../components/Tabs';
import { BucketSize, SetRecipes, Recipe, Solution } from '../globalState';
import { ValidatedSizeForm } from '../components/ValidatedSizeForm';
import { ValidatedVolumeForm } from '../components/ValidatedVolumeForm';
import { Annotation, Card, AddButton, LabelValue } from '../components';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { RecipeSelector, CalculatedRecipeView } from '../recipe';

enum VolumeView { Volume, Size };

type Props = {
  solutions: Solution[];
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function Calculator({ setRecipes, solutions, recipes, navigation }: RootTabScreenProps<'Calculator'> & Props) {
  const [ec, setEc] = React.useState<number | undefined>();
  const [bucketSize, setBucketSize] = React.useState<BucketSize | undefined>();
  const [solution, setSolution] = React.useState<Solution | undefined>();
    const [recipeTitle, setRecipeTitle] = React.useState<string | undefined>();
  const [wipRecipe, setWipRecipe] = React.useState<Recipe | undefined>();

  const saveWipRecipe = () => {
    if (!!wipRecipe) {
      const i = recipes.findIndex(r => r.id === wipRecipe.id);

      if (i === -1) {
        setRecipes([...recipes, wipRecipe]);
        Toast.show({ type: 'success', text1: `Created new recipe, ${wipRecipe.name}`});
      } else {
        recipes[i] = wipRecipe;
        setRecipes(recipes.slice());
        Toast.show({ type: 'success', text1: `Updated recipe, ${wipRecipe.name}`});
      }
      console.info(`Saved recipe ${wipRecipe.name} to your recipes`);
    }
  };

  React.useEffect(() => {
    if (ec && solution && bucketSize && recipeTitle) {
      setWipRecipe({
        id: Math.random().toString(),
        name: recipeTitle,
        solution,
        bucketSize,
        ec
      });
    }
  }, [ec, solution, bucketSize, recipeTitle]);

  return (
    <Screen title="calculator">
      <ScrollView>
        <View>
          {wipRecipe && <CalculatedRecipeView  defaultRecipe={wipRecipe} />}
          <Card title="Pick a Recipe" editable={false}>
            <RecipeSelector recipes={recipes} defaultRecipe={wipRecipe} onChange={setWipRecipe} />
          </Card>
          <Card title="Create a New Recipe" editable={false}>
            <LabelValue editable={true} label="title" onChange={setRecipeTitle} />
            <LabelValue editable={true} label="ec (millisiemens/cm)" onChangeNumber={handleSetEc(setEc)} />
            <Picker onValueChange={handleSetSolution(setSolution, solutions)} selectedValue={solution?.name}>
              <Picker.Item key="none" label="Pick a solution" value={undefined} />
              {solutions.map(s => <Picker.Item key={s.id} label={s.name} value={s.name}/>)}
            </Picker>
            <Tabs defaultKey="volume">
              <Tab title="Volume" id="volume">
                <ValidatedVolumeForm onChange={setBucketSize} />
              </Tab>
              <Tab title="Size" id="size">
                <ValidatedSizeForm onChange={setBucketSize} />
              </Tab>
            </Tabs>
            <View style={styles.saveActions}>
              <Annotation>Save recipe</Annotation>
              <AddButton disabled={!wipRecipe} onPress={saveWipRecipe} />
            </View>
          </Card>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  saveActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
