import * as React from 'react';
import { Text } from 'react-native';
import { Recipe, Solution } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';
import { ConfirmationModal, AddButton, Card } from '../components';

/**
 * Renders a provided recipe and allows it to be edited and saved
 * Or renders a WIP recipe and allows it to be created
 *
 * Gives user the ability to save or clear the currently edited recipe
 * When the recipe is done, we submit it through the onChange
 */

type CalculatedRecipeViewProps = {
  defaultRecipe?: Recipe;
  solutions?: Solution[];
  recipes?: Recipe[];
  onChange?: (r?: Recipe) => void;
};

export const CalculatedRecipeView: React.FC<CalculatedRecipeViewProps> = ({
  defaultRecipe,
  recipes,
  solutions,
  onChange,
}) => {
  return (
    <Card>
      <RecipeInstructions
        editable={true}
        showTitle={true}
        recipe={defaultRecipe}
        solutions={solutions}
        recipes={recipes}
        onChange={onChange}
      />
    </Card>
  );
};
