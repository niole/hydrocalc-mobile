import * as React from 'react';
import { Picker, Text, View } from 'react-native';
import { Recipe } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';

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
    <View>
      <View>
        <Text>Create or </Text>
          <Picker selectedValue={selectedRecipe ? selectedRecipe.name : ""} onValueChange={selectRecipe(setRecipe, recipes)}>
            <Picker.Item label="pick" value="" />
            {recipes.map(r => <Picker.Item label={r.name} value={r.name} />)}
          </Picker>
          <Text> a recipe</Text>
        </View>
        <View>
          {selectedRecipe ? <RecipeInstructions recipe={selectedRecipe} /> : <Text>...</Text>}
        </View>
    </View>
  );
};

const selectRecipe = (setRecipe: (r: Recipe | undefined) => void, recipes: Recipe[]) => (name: string): void => {
  setRecipe(recipes.find(r => r.name === name));
};
