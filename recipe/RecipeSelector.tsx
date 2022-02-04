import * as React from 'react';
import { Recipe } from '../globalState';
import { Picker, PickerItem } from '../components';

type Props = {
  recipes: Recipe[];
  selectedRecipeId?: string;
  onChange?: (r?: Recipe) => void;
};

/**
 * renders a recipe selected from all recipes that a user has created
 * TODO limit number of recipes to like 100
 */
export const RecipeSelector: React.FC<Props> = ({ selectedRecipeId, recipes, onChange }) => {
  const [selectedRecipe, setRecipe] = React.useState<Recipe | undefined>(getSelectedRecipe(recipes, selectedRecipeId));

  const handleSetRecipe = (recipe?: Recipe) => {
    setRecipe(recipe);
    onChange ? onChange(recipe) : undefined;
  };

  React.useEffect(() => {
    setRecipe(getSelectedRecipe(recipes, selectedRecipeId));
  }, [selectedRecipeId]);

  return (
    <Picker label="recipe" selectedValue={selectedRecipeId} onValueChange={selectRecipe(handleSetRecipe, recipes)}>
      <PickerItem key="pick" label="None selected" value="" />
      {recipes.map(r => <PickerItem key={r.id} label={r.name} value={r.id} />)}
    </Picker>
  );
};

const selectRecipe = (setRecipe: (r: Recipe | undefined) => void, recipes: Recipe[]) => (id: string): void => {
  setRecipe(recipes.find(r => r.id === id));
};

const getSelectedRecipe = (recipes: Recipe[], id?: string): Recipe | undefined =>
  id ? recipes.find(r => r.id === id) : undefined;
