import * as React from 'react';
import { StyleSheet, Picker, Text, View } from 'react-native';
import { Recipe } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';

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
      <View>
        <Text>Create or </Text>
          <Picker selectedValue={selectedRecipe ? selectedRecipe.name : ""} onValueChange={selectRecipe(setRecipe, recipes)}>
            <Picker.Item label="pick" value="" />
            {recipes.map(r => <Picker.Item label={r.name} value={r.name} />)}
          </Picker>
          <Text> a recipe</Text>
        </View>
        <View>{selectedRecipe ? <RecipeInstructions recipe={selectedRecipe} /> : <Text>...</Text>}</View>
    </View>
  );
};

const selectRecipe = (setRecipe: (r: Recipe | undefined) => void, recipes: Recipe[]) => (name: string): void => {
  setRecipe(recipes.find(r => r.name === name));
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
