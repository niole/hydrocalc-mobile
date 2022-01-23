import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Recipe } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';
import { Card } from '../components';

/**
 * Renders a provided recipe or renders a recipe selected from all recipes that a user has created
 * TODO limit number of recipes to like 100
 */

type CalculatedRecipeViewProps = {
  recipes: Recipe[];
  defaultRecipe?: Recipe;
};

export const CalculatedRecipeView: React.FC<CalculatedRecipeViewProps> = ({ defaultRecipe, recipes }) => {
  const [selectedRecipe, setRecipe] = React.useState<Recipe | undefined>(defaultRecipe);

  React.useEffect(() => {
    setRecipe(defaultRecipe);
  }, [defaultRecipe]);

  return (
    <View style={styles.container}>
      <Card editable={false} title="Recipe">
        {selectedRecipe ? <RecipeInstructions recipe={selectedRecipe} /> : <Text>...</Text>}
      </Card>
      <Picker selectedValue={selectedRecipe ? selectedRecipe.name : ""} onValueChange={selectRecipe(setRecipe, recipes)}>
        <Picker.Item key="pick" label="Pick from your recipes" value="" />
        {recipes.map(r => <Picker.Item key={r.id} label={r.name} value={r.name} />)}
      </Picker>
    </View>
  );
};

const selectRecipe = (setRecipe: (r: Recipe | undefined) => void, recipes: Recipe[]) => (name: string): void => {
  setRecipe(recipes.find(r => r.name === name));
};

const styles = StyleSheet.create({
  container: {
    //    flexDirection: 'row',
  },
});
