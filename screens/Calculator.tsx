import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { BucketSize, SetRecipes, Recipe, Solution } from '../globalState';
import { ValidatedSizeForm } from '../components/ValidatedSizeForm';
import { ValidatedVolumeForm } from '../components/ValidatedVolumeForm';
import { Toast, Tabs, Tab, PickerItem, Picker, Annotation, Card, AddButton, LabelValue } from '../components';
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
  const [updatedRecipe, setUpdatedRecipe] = React.useState<Recipe | undefined>();

  React.useEffect(() => {
    if (!!updatedRecipe) {
      const i = recipes.findIndex(r => r.id === updatedRecipe.id);

      if (i === -1) {
        setRecipes([...recipes, updatedRecipe]);
        Toast.success(`Created new recipe, ${updatedRecipe.name}`);
      } else {
        const oldRecipeName = recipes[i].name;
        recipes[i] = updatedRecipe;
        setRecipes(recipes.slice());
        if (oldRecipeName !== updatedRecipe.name) {
          Toast.success(`Updated recipe, ${oldRecipeName} -> ${updatedRecipe.name}`);
        } else {
          Toast.success(`Updated recipe, ${updatedRecipe.name}`);
        }
      }
      console.info(`Saved recipe ${updatedRecipe.name} to your recipes`);
    }
  }, [updatedRecipe]);

  return (
    <Screen title="calculator">
      <ScrollView>
        <View>
          <CalculatedRecipeView
            recipes={recipes}
            solutions={solutions}
            onChange={setUpdatedRecipe}
            defaultRecipe={updatedRecipe}
          />
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

const styles = StyleSheet.create({
  saveActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
