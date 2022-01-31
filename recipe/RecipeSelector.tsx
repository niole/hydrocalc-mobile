import * as React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Recipe } from '../globalState';

type Props = {
  recipes: Recipe[];
  defaultRecipe?: Recipe;
  onChange?: (r?: Recipe) => void;
};

/**
 * renders a recipe selected from all recipes that a user has created
 * TODO limit number of recipes to like 100
 */
export const RecipeSelector: React.FC<Props> = ({ defaultRecipe, recipes, onChange }) => {
  const [selectedRecipe, setRecipe] = React.useState<Recipe | undefined>(defaultRecipe);

  const handleSetRecipe = (recipe?: Recipe) => {
    setRecipe(recipe);
    onChange ? onChange(recipe) : undefined;
  };

  React.useEffect(() => {
    setRecipe(defaultRecipe);
  }, [defaultRecipe]);

  return (
    <Picker selectedValue={selectedRecipe ? selectedRecipe.name : ""} onValueChange={selectRecipe(handleSetRecipe, recipes)}>
      <Picker.Item key="pick" label="Pick from your recipes" value="" />
      {recipes.map(r => <Picker.Item key={r.id} label={r.name} value={r.name} />)}
    </Picker>
  );
};

const selectRecipe = (setRecipe: (r: Recipe | undefined) => void, recipes: Recipe[]) => (name: string): void => {
  setRecipe(recipes.find(r => r.name === name));
};
